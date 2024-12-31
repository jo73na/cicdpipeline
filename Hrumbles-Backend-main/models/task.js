const mongoose = require('mongoose');
const TASKSCHEMA = {

     task_id:String,
     task_title:String,
     description:String,
     status: { type:String, default:"Pending", enum:["Pending","Not Started","Cancelled","In Progress","Complete"] },
     start_date: {
        type: Date,
        required: false,
    },
    end_date: {
        type: Date,
        required: false,
    },
    start_time: { type: String }, 
    end_time: { type: String }, 
    assign_task: [{type:mongoose.Schema.Types.ObjectId, ref:"employee", default:[],}],
    tags:{ type:String, default:"Hiring", enum:["Hiring","Projects","Finance"] },
    priority: {type:String, default:"Low", enum:["Low", "Medium", "High"]},
    assignedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "admin", default: null, }],
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin", default: null },
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs", default: [] }],
    other_tasks: String,
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "tasks", default: null }
};

module.exports = TASKSCHEMA