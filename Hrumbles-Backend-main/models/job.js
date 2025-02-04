const mongoose = require('mongoose')
const JOBSSCHEMA = {

     job_id:String,
     job_title:String,
     job_type:String,
     exp_to:Number,
     exp_from:Number,
     vendor_clientbillable:Number,
     budget:Number,
     vendor_job_type:String,
     vendor_salary_type:String,
     end_client: {
      type: [String],
      default: []
    },
    client_id: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "clients" }],
      default: []
    },
    job_location: {
      type: [String],
      default: []
    },
    poc: {
      type: [String],
      default: []
    },
     joing_avaliability:String,
     skils:[String],
     required_no_of_candidates:Number,
     job_description:String,
     created_by:{ type:mongoose.Schema.Types.ObjectId,ref:"admin"},
     company_id:{ type:mongoose.Schema.Types.ObjectId, ref:"company", default:null, },

     created_on:{
        type:Date,
        default:Date.now()
     },
     assigneddata :[
      {
      
       assign:  {type:mongoose.Schema.Types.ObjectId, ref:"admin", default:null, },
      //  budget:Number,
       vendor_salary_type:String,
       vendor_job_type:String,
       vendor_clientbillable:Number,
       assign_type:String
      }
     ],
     assign:[{
      
       type:mongoose.Schema.Types.ObjectId, ref:"admin", default:null, }],

  status: { type:String, default:"opened", enum:["opened","closed","Hold"] },
   /////////////////
   primarySelected: { type: String, enum: ['Internal', 'External'] },
   secondarySelected: { type: String, enum: ['Direct Hiring', 'Talent Deployment', 'External Staffing'] },

   salary: {
      type: Number,
      required: true,
    },
    salaryType:{
      type:String
     },

  tenure: { type: String },
  contractType: { type: String, enum: ['Full Time', 'Contract','Both'], default: 'Full Time' },
  notice_period: {type: String},


     
    
    
};

module.exports = JOBSSCHEMA