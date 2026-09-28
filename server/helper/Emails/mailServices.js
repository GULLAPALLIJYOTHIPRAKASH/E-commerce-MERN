const transpoter = require("../../config/brevomail");


const sendVerificationEmail  = async(email , otp) => {

    const email_verify_url = process.env.FRONTEND_URL+"/auth/emailverify";

    await transpoter.sendMail({

        from: `Shop E-Commerces <${process.env.BREVO_EMAIL}>`,
        to:email,
        subject:`Verify your email`,
        html: `<h2>Welcome to Shop E-Commerces</h2>
      <p>Click the button below to verify your email.</p>

      <a href="${email_verify_url}"
         style="background:#2563eb;color:white;padding:12px 20px;
                text-decoration:none;border-radius:6px;display:inline-block;">
         Verify Email
      </a>

      <p>This link expires in 1 hour.</p>
    `,
  });
}

module.exports = { sendVerificationEmail}