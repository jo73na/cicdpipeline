const mongoose = require('mongoose')
const EXPENCSEOTHERS = {
   name:{type:String,required:true},
  status: { type:Boolean, default:true },
parent_id:{
    type:mongoose.Schema.Types.ObjectId, ref:"expenseothers", default:null,
},
created_by:{ type:mongoose.Schema.Types.ObjectId, ref:"admin_login", default:null, },
     
    

    
};

module.exports = EXPENCSEOTHERS