import readLine from "readline";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Welcome to the email sender!');
let data = {
    service: 'gmail',
    user: '',
    recipient: '',
    pass: '',
    subject: '',
    text: ''
};
const emailSender = () => {
    console.clear();
    rl.question("--EMAIL SENDER-- \nDo you want to send an email? (y/n)\n", (answer) => {
        if (answer.toUpperCase() === 'Y') {
            console.clear();
            rl.question("--EMAIL SENDER-- \nWhat service do you want to use? (e.g. gmail)\n", (answer) => {
                data.service = answer;
                console.clear();
                rl.question("--EMAIL SENDER-- \nWhat is your email? (Just press enter to use the default one)\n", (answer) => {
                    if (answer === '') {
                        data.user = process.env.DEFAULT_EMAIL;
                    }
                    else {
                        data.user = answer;
                    }
                    ;
                    console.clear();
                    rl.question("--EMAIL SENDER-- \nWhat is your password? (Just press enter to use the default one)\n", (answer) => {
                        if (answer === '') {
                            data.pass = process.env.DEFAULT_PASSWORD;
                        }
                        else {
                            data.pass = answer;
                        }
                        ;
                        console.clear();
                        rl.question("--EMAIL SENDER-- \nWho is the recipient?\n", (answer) => {
                            data.recipient = answer;
                            console.clear();
                            rl.question("--EMAIL SENDER-- \nWhat is the subject?\n", (answer) => {
                                data.subject = answer;
                                console.clear();
                                rl.question("--EMAIL SENDER-- \nWhat is the text?\n", (answer) => {
                                    data.text = answer;
                                    console.clear();
                                    if (data.pass != null && data.user != null && data.recipient != null && data.service != null && data.subject != null && data.text != null) {
                                        console.clear();
                                        createTransporter();
                                        createMailOptions();
                                        sendEmail();
                                        rl.close();
                                    }
                                    else {
                                        console.clear();
                                        console.log('--EMAIL SENDER-- \n' + '%c Data are not valid. Please try again.', 'color: red');
                                        setTimeout(() => {
                                            rl.close();
                                        }, 5000);
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }
        else if (answer.toUpperCase() === 'N') {
            console.clear();
            console.log('--EMAIL SENDER-- \nGoodbye!');
            rl.close();
        }
        else {
            console.clear();
            console.log('--EMAIL SENDER-- \nPlease enter a valid answer. (y/n)');
            emailSender();
        }
    });
};
emailSender();
let transporter;
let mailOptions;
const createTransporter = () => {
    const newTransporter = nodemailer.createTransport({
        service: data.service,
        auth: {
            user: data.user,
            pass: data.pass
        }
    });
    transporter = newTransporter;
    return;
};
const createMailOptions = () => {
    const newMailOptions = {
        from: data.user,
        to: data.recipient,
        subject: data.subject,
        text: data.text
    };
    mailOptions = newMailOptions;
    return;
};
const sendEmail = () => {
    transporter.sendMail(mailOptions, (err, info) => {
        console.clear();
        console.log('--EMAIL SENDER-- \nSending email...\n');
        if (err) {
            console.clear();
            console.log('--EMAIL SENDER-- \n' + '%c Error sending email. Please try again.', 'color: red');
            setTimeout(() => {
                rl.close();
            }, 5000);
        }
        else {
            console.log("%c Email sent successfully!", 'color: green');
        }
    });
};
