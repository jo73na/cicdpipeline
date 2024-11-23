const mongoose = require("mongoose");
const signup_schema = {
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  hashedOtp: { type: String },
  otpExpiresAt: { type: Date },
  otp_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now( ) },
  phone: {type: Number, required:true},
  company_name: {type: String, required: true},
  team_size: {
    type: String,
    required: true,
    enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10001+"], // Allowed options for team_size
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Regex to validate domain (e.g., example.com, example.in, etc.)
        return /^([a-zA-Z0-9]+[-])*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid domain!`
    }
  }
};
module.exports = signup_schema;
