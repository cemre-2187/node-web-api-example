const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
let newUserMailTemplate = path.resolve(__dirname, "../templates/mail/newuser.html");
let forgotPasswordMailTemplate = path.resolve(__dirname, "../templates/mail/userresetpassword.html");

const mailConfig = {
    host: process.env.mail_host,
    port: process.env.mail_port,
    secure: false,
    auth: {
        user: process.env.mail_auth_user,
        pass: process.env.mail_auth_pass
    },
};
const createActivationLink = (user) => {
    let payload = JSON.stringify({
        _id: user._id,
        role: user.role,
    });
    let token = jwt.sign(payload, process.env.secret);
    return process.env.frontendURL.split(",")[0] + `api/auth/verify/${token}`;
};

const sendMail = async (subject, content, from, to) => {
    try {
        let transporter = nodemailer.createTransport(mailConfig);
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: content,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.sendActivationMail = async (user) => {
    try {
        let htmlRawString = fs.readFileSync(newUserMailTemplate, "utf8");
        let tmpHtmlTemp = htmlRawString.replace(
            "{{logourl}}",
            process.env.mailLogo
        );
        tmpHtmlTemp = tmpHtmlTemp.replace(/{{project}}/g, process.env.title);
        let activationLink = createActivationLink(user);
        tmpHtmlTemp = tmpHtmlTemp.replace(
            /{{url}}/g,
            activationLink
        );
        tmpHtmlTemp = tmpHtmlTemp.replace(
            /{{websiteurl}}/g,
            "" + process.env.mainURL
        );
        return sendMail(
            "Mail Aktivasyonu",
            tmpHtmlTemp,
            process.env.mail_auth_user,
            user.email
        ) ? { success: true, message: "Mail sent" } : { success: true, message: "Failed to send mail" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

exports.sendPasswordResetMail = async (email, url, newPassword) => {
    try {
        let htmlRawString = fs.readFileSync(forgotPasswordMailTemplate, "utf8");
        let tmpHtmlTemp = htmlRawString.replace("{{Password}}", newPassword);
        tmpHtmlTemp = tmpHtmlTemp.replace("{{logourl}}", process.env.mailLogo);
        // Add url to reset password
        tmpHtmlTemp = tmpHtmlTemp.replace(/{{url}}/g, url);
        tmpHtmlTemp = tmpHtmlTemp.replace(
            /{{websiteurl}}/g,
            "" + process.env.mainURL
        );
        return sendMail(
            "Reset Password",
            tmpHtmlTemp,
            process.env.mail_auth_user,
            email
        ) ? { success: true, message: "Mail sent" } : { success: true, message: "Failed to send mail" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// export sendmail
exports.sendMail = sendMail;