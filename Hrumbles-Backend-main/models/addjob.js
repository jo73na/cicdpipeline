const mongoose = require('mongoose')
const addjobSchema = {
    jobId: {
        type: String,
        required: true,
        unique: true,
        default: () => `job-${Date.now()}`, 
      },
    jobTitle: { type: String,  },
    exp_from: { type: Number,  },
    exp_to: { type: Number,  },
    required_no_of_candidates: {
      type: Number, 
      required: true,
    },
    CTC: {
      amount: { type: Number,  },
      type: { type: String, enum: ['Hourly', 'Monthly'],  },
    },
    salary: {
        amount: { type: Number},
        type: {
          type: String,
        },
      },
    tenure: { type: String,  },
    clientName: { type: String,  },
    clientBudget: { type: Number,  },
    endClient: { type: String,  },
    POC: { type: String,  },
    contractType: { type: String, enum: ['Full Time', 'Contract','Both'], default: 'Full Time' },
    percentage: {
      value: { type: Number,  },
      type: { type: String, enum: ['Percentage', 'Fixed'], default: 'Percentage' },
    },
    assignTeam: { type: String },
    location: { type: [String],  },
    jobDescription: { type: String },
    primaryCategory: { type: String, enum: ['Internal', 'External'],  },
    secondaryCategory: { type: String, enum: ['Direct Hiring', 'Talent Deployment', 'External Staffing'],  },
  };

module.exports = addjobSchema