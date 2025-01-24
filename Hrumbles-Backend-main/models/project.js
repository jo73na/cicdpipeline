const mongoose = require('mongoose');
const { type } = require('./Event');
const PROJECTSSCHEMA = {
   project_name: { type: String, required: true },
   client_id: { type: mongoose.Schema.Types.ObjectId, ref: "clients", required: true },
   employees_needed: { type: Number, required: true },
   employees_assigned: { type: Number, default: 0 },
   sow: { type: String }, 
   startDate: { type: Date, required: true },
   endDate: { type: Date, required: true },
   duration:{type:Number},
   status: {
     type: String,
     default: "Ongoing",
     enum: ["Ongoing", "Completed"]
   },
   assignedEmployees: [{
    employee_id:{type:mongoose.Schema.Types.ObjectId, ref:"employee"},
    name: { type: String, required: true },
    status: {
      type: String,
      default: "Working",
      enum: ["Working", "Relieved", "Terminated"]
    },
    duration: {
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
      days: { type: Number, required: false}
    },
    clientBilling: {type:Number},
    billingType:{type:String},
    sow:{type:String},
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin_login", default: null }, 
  assignedAt: { type: Date, default: Date.now, }
  }],
   created_by: { type: mongoose.Schema.Types.ObjectId, ref: "admin_login", default: null },
   
     
    

    
};

module.exports = PROJECTSSCHEMA