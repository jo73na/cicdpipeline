const express = require('express');
const router = express.Router();
const { generateOTP, hashOtp, validateOtp } = require("../../utils/otpGenerator");

const { sendOTPEmail, sendUserDetailsEmail } = require("../../utils/sendOtp");
const bcrypt = require('bcrypt');
const { admin } = require('../../utils/schemaMaster'); // Import the admin model


router.get('/status', async (req, res) => {
  const { email_id } = req.query;

  if (!email_id) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const find_admin = await admin.findOne({ email_id });

    if (!find_admin || !find_admin.hashedOtp) {
      return res.status(404).json({ error: 'No OTP found' });
    }

    // Check if OTP is expired
    if (find_admin.otpExpiresAt < new Date()) {
      return res.status(200).json({ valid: false });
    }

    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error('Error checking OTP status:', error);
    res.status(500).json({ error: 'Failed to check OTP status' });
  }
});


// Generate and send OTP
router.post('/send-otp', async (req, res) => {
  const { email_id } = req.body;

  if (!email_id) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const find_admin = await admin.findOne({ email_id });
    if (!find_admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if an OTP is still valid
    if (find_admin.hashedOtp && find_admin.otpExpiresAt > new Date()) {
      // Calculate remaining time for OTP expiration
      const timeRemaining = Math.floor((find_admin.otpExpiresAt - new Date()) / 60000); // in minutes
      return res.status(200).json({
        message: `OTP is still valid, please validate it. Expires in ${timeRemaining} minutes.`
      });
    }

    // Generate a new OTP
    const otp = generateOTP();
    const result = await sendOTPEmail(email_id, otp);
    if (!result.success) {
      throw new Error('Failed to send OTP');
    }

    // Hash the OTP before storing it
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Update admin record with new OTP and expiration time (9 hours expiry)
    await admin.findByIdAndUpdate(
      find_admin._id,
      {
        hashedOtp,
        otpExpiresAt: new Date(Date.now() + 9 * 60 * 60 * 1000) // 9 hours expiry
      },
      { new: true }
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


// Validate OTP
// Validate OTP
router.post('/validate-otp', async (req, res) => {
  const { email_id, otp } = req.body;

  if (!email_id || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const find_admin = await admin.findOne({ email_id });
    if (!find_admin || !find_admin.hashedOtp) {
      return res.status(404).json({ error: 'OTP not found' });
    }

    // Check if OTP is expired
    if (find_admin.otpExpiresAt < new Date()) {
      // Clear OTP if expired
      await admin.findByIdAndUpdate(find_admin._id, { hashedOtp: null, otpExpiresAt: null });
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Verify OTP
    const isOtpValid = await bcrypt.compare(otp, find_admin.hashedOtp);
    if (isOtpValid) {
      // Update otp_verified to true and clear OTP fields
      await admin.findByIdAndUpdate(
        find_admin._id,
        {
          otp_verified: true,
          hashedOtp: null,
          otpExpiresAt: null
        },
        { new: true }
      );

      return res.status(200).json({ success: true, message: 'OTP validated successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error validating OTP:', error);
    res.status(500).json({ error: 'Failed to validate OTP' });
  }
});



module.exports = router;
/////////////