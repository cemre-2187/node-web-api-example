// Models
const ContactForm = require("../../models/contactFormModel");
// Functions and utiils
const catchAsync = require('../../utils/catchAsync');
const {sendMail} = require("../../utils/mailFunctions");
const AppError = require("../../utils/appError");

exports.sendContactMail = catchAsync(async (req, res, next) => {
        // Message to send
        const outputMessage = `
            <p>You have a new contact request</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Subject</h3>
            <p>${req.body.subject}</p>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `;
        // Create a new contact form
        await ContactForm.create(req.body);
        // Send a mail
        let sendMailSuccess = await sendMail(
            req.body.subject,
            outputMessage,
            req.body.email,
            "coskun.atak@rexven.com" //TODO: noreply.pintirim@gmail.com
        );
        if (sendMailSuccess)
            return res.status(200).send({ status: 'success', message: "Mail gönderildi." });
        else
        return next(new AppError('Mail gönderilemedi.', 400));
})