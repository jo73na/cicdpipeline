const express = require("express");
const router = express.Router();
const { generateOTP, hashOtp, validateOtp } = require("../../utils/otpGenerator");
const { sendOTPEmail, sendUserDetailsEmail } = require("../../utils/sendOtp");
const { signup } = require("../../utils/schemaMaster");

// Route to send OTP to user's email
router.post("/send-otp", async (req, res) => {
    const { email_id, name, phone, company_name, team_size, domain } = req.body;
  
    try {
      // Check if the email_id already exists in the database
      const existingUser = await signup.findOne({ email_id, domain });
      
      if (existingUser) {
        // If email already exists, send a custom error message
        return res.status(400).json({ message: "This email_id is already registered" });
      }
  
      // Generate OTP
      const otp = generateOTP();  // Generate OTP
      const hashedOtp = await hashOtp(otp);  // Hash the OTP
      
      const otpEntry = new signup({
        name: name,
        email_id: email_id,
        phone:phone,
        company_name:company_name,
        team_size:team_size,
        domain: domain,
        hashedOtp: hashedOtp,  // Save hashed OTP in the 'hashedOtp' field
        otpExpiresAt: Date.now() + 10 * 60 * 1000,  // Set OTP expiration time (10 minutes)
        created_at: Date.now(),
      });
      
      await otpEntry.save();
      
  
      // Send OTP to user's email
      await sendOTPEmail(email_id, otp);
      
      return res.status(200).json({ message: "OTP sent successfully" });
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({ message: "Failed to send OTP", error });
    }
  });
  

// Route to validate OTP and send user details to predefined email
router.post("/validate-otp", async (req, res) => {
    const { email_id, otp, name, phone, company_name, team_size, domain } = req.body;
  
    // Check if all fields are present
    if (!email_id || !otp || !name || !phone || !company_name || !team_size || !domain) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
  
    try {
      // Retrieve the OTP entry from the database using the email_id
      const otpEntry = await signup.findOne({ email_id });
  
      // Check if an entry exists for the provided email_id
      if (!otpEntry) {
        return res.status(400).json({ message: "OTP not found for this email" });
      }
  
      // Check if OTP has expired (10 minutes)
      const otpExpiry = Date.now() - otpEntry.otpExpiresAt;
      if (otpExpiry > 0) {
        return res.status(400).json({ message: "OTP expired" });
      }
  
      // Validate OTP by comparing the entered OTP with the stored hashed OTP
      const isOtpValid = await validateOtp(otp, otpEntry.hashedOtp);
  
      if (!isOtpValid) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // OTP is valid, mark it as verified and update the database
      otpEntry.otp_verified = true;
      await otpEntry.save();
  
      await sendUserDetailsEmail(email_id, name, phone, company_name, team_size, domain);
  
      return res.status(200).json({ message: "OTP verified successfully and user details sent" });
    } catch (error) {
      console.error("Error validating OTP:", error);
      return res.status(500).json({ message: "Failed to validate OTP", error });
    }
  });


  

  // Route to delete user by email_id
router.delete("/delete-user", async (req, res) => {
    const { email_id } = req.body;

    if (!email_id) {
        return res.status(400).json({ message: "Email ID is required" });
    }

    try {
        // Find and delete the user by email_id 
        const deletedUser = await signup.findOneAndDelete({ email_id });

        // Check if the user exists
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Failed to delete user", error });
    }
});


  

module.exports = router;
