const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    secure:false,
    auth:{
        user: process.env.BREVO_EMAIL,
        pass:process.env.BREVO_SMTP_KEY
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000

})


transporter.verify((error, success) => {
    if (error) {
        console.error("Brevo SMTP connection failed:", error);
    } else {
        console.log("Brevo SMTP connection successful");
    }
});

module.exports = transporter;