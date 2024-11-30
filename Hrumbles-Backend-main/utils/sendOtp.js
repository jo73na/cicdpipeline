require("dotenv").config();
const nodemailer = require("nodemailer");

// Zoho Transporter for notifications
const zohoNotificationsTransporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: process.env.ZOHO_SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: "emailapikey",
    pass: process.env.ZOHO_NOREPLY_PASS,
  },
});

// Function to send OTP email with HTML template
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.ZOHO_NOREPLY_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
       <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" /><!--$-->
  </head>

  <body style="background-color:#ffffff">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
      <tbody>
        <tr style="width:100%">
          <td>
          <h1 style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:24px;font-weight:bold;margin:40px 0;padding:0">Login</h1>
           <p style="font-size:14px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-bottom:14px">Please use the one-time password below for secure login:</p><code style="display:inline-block;padding:16px 4.5%;width:90.5%;background-color:#f4f4f4;border-radius:5px;border:1px solid #eee;color:#333">${otp}</code>
            <p style="font-size:14px;line-height:24px;margin:24px 0;color:#ababab;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:14px;margin-bottom:16px">This code is valid for 10 minutes.</p>
            <p style="font-size:14px;line-height:24px;margin:24px 0;color:#ababab;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:20px">Disclaimer: This is an auto-generated email. Please DO NOT reply.</p>
           <img
<img
  src="https://res.cloudinary.com/dsrmbnai0/image/upload/v1732912241/Hricon_sa4awo.png"
  alt="Hrumbles Logo"
  style="display: block; outline: none; border: none; text-decoration: none; width: 32px; height: 32px;"
/><p style="font-size:14px;line-height:24px;margin:24px 0;color:#ababab;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:10px">Simplify reporting and stay organized—all in one platform.</p>

            </td>
        </tr>
      </tbody>
    </table><!--/$-->
  </body>
      `,
      replyTo: process.env.ZOHO_NOREPLY_USER,
    };

    await zohoNotificationsTransporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error };
  }
};

// Function to send user details email
// Function to send user details email with HTML template
const sendUserDetailsEmail = async (
  email,
  name,
  phone,
  company_name,
  team_size,
  domain
) => {
  try {
    const mailOptions = {
      from: process.env.ZOHO_NOREPLY_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New User Signup Details",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #88a67e; padding: 20px; text-align: center;">
            <img src="http://localhost:8080/public/images/Hricon.svg" alt="Hrumbles" style="width: 100px; height: auto;" />
            <h2 style="color: #fff; margin: 0;">New User Signup Details</h2>
          </div>
          <div style="padding: 20px;">
            <p>A new user has signed up with the following details:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Mobile No:</strong> ${phone}</li>
              <li><strong>Company Name:</strong> ${company_name}</li>
              <li><strong>Team Size:</strong> ${team_size}</li>
              <li><strong>Domain:</strong> ${domain}.hrumbles.ai</li>
            </ul>
            <p>Please review and take the necessary actions.</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 15px; text-align: center;">
            <small style="color: #888;">&copy; 2024 Hrumbles. All rights reserved.</small>
          </div>
        </div>
      `,
    };

    await zohoNotificationsTransporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending user details email:", error);
    return { success: false, error };
  }
};

module.exports = { sendOTPEmail, sendUserDetailsEmail };
