const bcrypt = require("bcrypt");

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensure OTP is a string
};

// Function to hash the OTP
const hashOtp = async (otp) => {
  try {
    if (typeof otp !== "string") {
      otp = otp.toString();
    }
    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    return hashedOtp;
  } catch (error) {
    console.error("Error hashing OTP:", error);
    throw error;
  }
};

const validateOtp = async (enteredOtp, hashedOtp) => {
  // Add logging to debug values before comparison
  console.log("Entered OTP:", enteredOtp);
  console.log("Hashed OTP:", hashedOtp);

  // Ensure both enteredOtp and hashedOtp are not undefined or null
  if (!enteredOtp || !hashedOtp) {
    throw new Error('Entered OTP or Hashed OTP is missing');
  }

  return await bcrypt.compare(enteredOtp, hashedOtp);
};

module.exports = {
  generateOTP,
  hashOtp,
  validateOtp,
};
