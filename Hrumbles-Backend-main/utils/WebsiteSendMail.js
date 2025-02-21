const { SendMailClient } = require("zeptomail");
require("dotenv").config();

// Initialize ZeptoMail Client
const client = new SendMailClient({
  url: process.env.ZEPTO_URL,
  token: process.env.ZEPTO_TOKEN,
});

// Function to send email
async function sendEmail(formData) {
  const recipientEmail = process.env.ZEPTO_RECIPIENT || formData.email;

  if (!recipientEmail) {
    console.error("Error: Recipient email is missing.");
    return { success: false, message: "Recipient email is missing." };
  }

  console.log("Sending email to:", recipientEmail);

  const emailData = {
    from: { address: process.env.ZEPTO_SENDER, name: "HRUMBLES Notification" },
    to: [{ email_address: { address: recipientEmail, name: "Recipient" } }],
    subject: "New Contact Form Submission - HRUMBLES",
    htmlbody: `
      <h2>New Contact Form Submission</h2>
      <p><strong>First Name:</strong> ${formData.first_name}</p>
      <p><strong>Last Name:</strong> ${formData.last_name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Organization:</strong> ${formData.organization}</p>
      <p><strong>Contact No:</strong> ${formData.contact_no}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
    `,
  };

  try {
    let response = await client.sendMail(emailData);
    console.log("Email sent:", response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", JSON.stringify(error, null, 2));
    return { success: false, message: error.error.message || "Failed to send email." };
  }
}

// ✅ Use `module.exports` for CommonJS
module.exports = sendEmail;
