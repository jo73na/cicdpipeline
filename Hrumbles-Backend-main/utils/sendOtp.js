require('dotenv').config();
const nodemailer = require('nodemailer');

// Create Gmail transporter
const gmailTransporter = nodemailer.createTransport({
  host: process.env.GMAIL_SMTP_HOST,
  port: process.env.GMAIL_SMTP_PORT,
  secure: process.env.GMAIL_SMTP_PORT === '465', // true for port 465, false for port 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Create Outlook transporter
const outlookTransporter = nodemailer.createTransport({
  host: process.env.OUTLOOK_SMTP_HOST,
  port: process.env.OUTLOOK_SMTP_PORT,
  secure: process.env.OUTLOOK_SMTP_PORT === '465',
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASSWORD,
  },
});

// Function to select transporter based on email domain
const getTransporter = (email) => {
  if (email.endsWith('@gmail.com')) {
    return gmailTransporter;
  } else if (email.endsWith('@outlook.com') || email.endsWith('@hotmail.com')) {
    return outlookTransporter;
  } else {
    return gmailTransporter; // Default to Gmail if domain is not specified
  }
};

// Function to send OTP email
// Function to send OTP email with HTML template
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = getTransporter(email);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #88a67e; padding: 20px; text-align: center;">
            <img src="http://localhost:8080/public/images/Hricon.svg" alt="Hrumbles" style="width: 100px; height: auto;" />
            <h2 style="color: #fff; margin: 0;">Your OTP Code</h2>
          </div>
          <div style="padding: 20px;">
            <p>Hello,</p>
            <p>Thank you for signing in! Please use the OTP below to verify your email address:</p>
            <h3 style="color: #0073e6; text-align: center;">${otp}</h3>
            <p>If you did not request this, please ignore this email.</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 15px; text-align: center;">
            <small style="color: #888;">&copy; 2024 Hrumbles. All rights reserved.</small>
          </div>
        </div>
      `,
      replyTo: 'no-reply@example.com',
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error };
  }
};

// Function to send user details email
// Function to send user details email with HTML template
const sendUserDetailsEmail = async (email, name, phone, company_name, team_size, domain) => {
  try {
    const transporter = getTransporter(process.env.ADMIN_EMAIL);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New User Signup Details',
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

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending user details email:', error);
    return { success: false, error };
  }
};


module.exports = { sendOTPEmail, sendUserDetailsEmail };
