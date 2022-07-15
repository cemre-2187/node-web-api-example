const nodemailer = require('nodemailer');
const newUser = require('../templates/mail/newUser');
const forgotPassword = require('../templates/mail/forgotPassword');

module.exports = class MailService {
    constructor(user, URL, password) {
        this.to = user.email,
            this.name = user.firstName,
            this.URL = URL,
            this.password = password
    };

    newTransport() {
        // 1) Create a transporter object
        return nodemailer.createTransport({
            service: 'SendGrid',
            port: 587,
            auth: {
                user: "apikey",
                pass: process.env.SEND_GRID_API_KEY,
            },
        });
    }

    // Send the actual email
    async send(subject, html) {
        // 1) Define email options
        const mailOptions = {
            from: process.env.email,
            to: this.to,
            subject,
            html,
        };
        // 2) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    };

    async sendEmailVerification() {
        await this.send("Üye Hesap Doğrulama", newUser(this.name, this.URL));
    };
    async sendForgotPasswordEmail() {
        await this.send("Üye Şifre Sıfırlama", forgotPassword(this.name, this.password, this.URL))
    }
}