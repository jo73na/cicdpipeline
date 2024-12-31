const mongoose = require('mongoose')
const EMPLOYEE_SCHEMA = {

    user_id: String,
    firstname: String,
    lastname: String,
    email: String,
    passwordHash: String,
    employee_id: String,
    user_role: String,
    user_status: String,

    dob: Date,
    gender: String,
    mobile: String,
    marital_status: String,
    blood_group: String,

    aadhar_num: {
      type: String,
      validate: {
        validator: (v) => /^\d{12}$/.test(v),
        message: "Aadhar Number must be 12 digits!",
      },
    },
    aadhar_file: {
      type: String,
      default: undefined,
    },
    pan_num: {
      type: String,
      validate: {
        validator: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v),
        message: "Invalid PAN Number format!",
      },
    },
    pan_file: {
      type: String,
      default: undefined,
    },
    uan_num: {
      type: String,
      validate: {
        validator: (v) => /^[1][0-9]{11}$/.test(v),
        message: "UAN Number must start with 1 and be 12 digits long!",
      },
    },
    uan_file: {
      type: String,
      default: undefined,
    },
    esic_num: {
      type: String,
      validate: {
        validator: (v) => /^\d{17}$/.test(v),
        message: "ESIC Number must be 17 digits!",
      },
    },
    esic_file: {
      type: String,
      default: undefined,
    },

    present_addr: String,
    present_country: String,
    present_state: String,
    present_district: String,
    present_zipcode: String,

    permanent_addr: String,
    permanent_country: String,
    permanent_state: String,
    permanent_district: String,
    permanent_zipcode: String,

    name_as_in_bank: String,
    bank_name: String,
    account_num: String,
    ifsc_code: {
      type: String,
      validate: {
        validator: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
        message: "Invalid IFSC Code format!",
      },
    },
    branch_name: String,
    branch_addr: String,
    bank_country: String,
    bank_state: String,
    bank_city: String,
    bank_zipcode: String,

    designation: String,
    department: String,
    reportsTo: Array,
    billing_type: String,
    net_amount: Number,
    salary_type: String,
    job_type: String,

    yearly_ctc: Number,
    monthly_ctc: Number,
    verified: Boolean,

    display_profile_file: {
      type: String,
      default: undefined,
    },
    cheque_file: {
      type: String,
      default: undefined,
    },
    authorization_form: {
      type: String,
      default: undefined,
    },
    verification_form: {
      type: String,
      default: undefined,
    },
    form_completion: {
      type: Number,
      default: 0,
    },

    emergencyContacts: [
      {
        relationship: String,
        name: String,
        phoneNumber: {
          type: String,
          validate: {
            validator: (v) => /^[0-9]{10}$/.test(v),
            message: "Phone number must be 10 digits!",
          },
        },
      },
    ],
    familyDetails: Array,
    ssc_file: {
      type: String,
      default: undefined,
    },
    hsc_file: {
      type: String,
      default: undefined,
    },
    degree_file: {
      type: String,
      default: undefined,
    },
    educationDetails: {
      type: Object,
      default: undefined,
    },
    additional_degree: Array,

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin_login",
      default: null,
    },

};

module.exports = EMPLOYEE_SCHEMA