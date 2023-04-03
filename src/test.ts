import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log('Welcome to the email sender!');

const data = {
    service: 'gmail',
    user: process.env.DEFAULT_EMAIL,
    recipient: process.env.DEFAULT_EMAIL,
    appPass: process.env.DEFAULT_PASSWORD,
    subject: 'Hello from Node.js',
    text: 'I sent this email using Node.js!'
};

const transporter = nodemailer.createTransport({
    service: data.service,
    auth: {
        user: data.user,
        pass: data.appPass
    }
});

const mailOptions = {
    from: data.user,
    to: data.recipient,
    subject: data.subject,
    text: data.text
};

const sendEmail = () => {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        console.log('Sending email...\n');
        if (err) {
            console.log(err)
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

sendEmail()