const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { job,locations,skils,endclients, clients} = require("../../utils/schemaMaster");
const { workexperience } = require("../../utils/schemaMaster");
const { success } = require("../../utils/response");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
const upload = require('../../utils/upload');
const { default: mongoose } = require("mongoose");
const JobCreateSendMail = require("../../utils/JobCreatedMail");


const crud = new crud_service();

const methods ={authAdmin}


//create
methods.add = asyncHandler(async (req, res) => {
  if (req?.user) {
    req.body.created_by = req.user._id;
    req.body.company_id = req.user.company_id;
  }

  try {
    // Insert job data
    const added = await crud.insertOne(job, req.body);

    // Update client data if client_id exists
    if (Array.isArray(req.body.client_id) && req.body.client_id.length > 0) {
      await crud.updateById(clients, req.body.client_id[0], { updatedAt: new Date() }, { new: true });
    }

    // Send email notification
    await JobCreateSendMail(added);

    // Insert job locations if not existing
    if (Array.isArray(req.body.job_location)) {
      await Promise.all(req.body.job_location.map(async (item) => {
        if (item) {
          const dataExist = await locations.findOne({ name: item });
          if (!dataExist) {
            await locations.create({ name: item });
          }
        }
      }));
    }

    // Insert skills if not existing
    if (Array.isArray(req.body.skils)) {
      await Promise.all(req.body.skils.map(async (item) => {
        if (item) {
          const skillExist = await skils.findOne({ name: item });
          if (!skillExist) {
            await skils.create({ name: item });
          }
        }
      }));
    }

    // Insert end clients if not existing
    if (Array.isArray(req.body.end_client)) {
      await Promise.all(req.body.end_client.map(async (item) => {
        if (item) {
          const dataExist = await endclients.findOne({ name: item });
          if (!dataExist) {
            await crud.insertOne(endclients, { name: item, client_id: req.body.client_id?.[0] });
          }
        }
      }));
    }

    success(res, 201, true, "Created Successfully");
  } catch (err) {
    console.error("Error in adding job:", err);
    throw new Error(err.message);
  }
});

router.post('/', methods.authAdmin, methods.add);

// Get All Jobs
const createIndexes = async () => {
  await mongoose.connection.collection('jobs').createIndex({ status: 1 });
  await mongoose.connection.collection('jobs').createIndex({ job_title: 1 });
  await mongoose.connection.collection('totallogs').createIndex({ job_id: 1 });
  await mongoose.connection.collection('clients').createIndex({ _id: 1 });
};

methods.getAll = asyncHandler(async (req, res) => {
  const company_id = req?.user?.company_id || null;

  // Ensure indexes exist
  await createIndexes();

  let filter = {};
  if (req.query.status) filter.status = { $in: req.query.status };
  if (req.query.job_title) {
      filter.$or = [
          { job_title: { $regex: new RegExp(req.query.job_title, 'i') } },
          { job_id: { $regex: new RegExp(req.query.job_title, 'i') } }
      ];
  }
  if (req.query.client_id) filter.client_id = req.query.client_id;
  if (req.query.created_by) filter.created_by = req.query.created_by;
  if (company_id) filter.company_id = company_id;

  // Adjust filters based on user role
  if (req.user?.role === "Client") {
      filter.client_id = { $in: [new mongoose.Types.ObjectId(req.user.client_id)] };
  } else if (req.user?.role === "Vendor" && !company_id) {
      filter.assign = { $in: [new mongoose.Types.ObjectId(req.user._id)] };
  }

  const aggregate = [
      { $match: filter }, // Ensure filtering applies to the query
      {
          $lookup: {
              from: "totallogs",
              localField: req.user?.role === "Vendor" ? "assign" : "_id",
              foreignField: req.user?.role === "Vendor" ? "created_by" : "job_id",
              as: "screening"
          }
      },
      { $lookup: { from: "clients", localField: "client_id", foreignField: "_id", as: "Clients" } },
      { $lookup: { from: "admins", localField: "created_by", foreignField: "_id", as: "done_by" } },
      { $sort: { createdAt: -1 } }
  ];

  if (company_id) {
      aggregate.unshift({ $match: { company_id } });
  }

  const totalCount = await job.countDocuments(filter);

  let data;
  if (req.query.limit === "all") {
      // Fetch all jobs if limit is "all"
      data = await job.aggregate(aggregate);
  } else {
      // Apply pagination when limit is defined
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 50, 500); // Increased limit to 500
      aggregate.push({ $skip: (page - 1) * limit }, { $limit: limit });

      data = await job.aggregate(aggregate);
  }

  try {
      success(res, 200, true, "Get Successfully", { total: totalCount, data });
  } catch (err) {
      throw new Error(err);
  }
});

 router.get('/', authAdmin,methods.getAll ); 

 methods.AssignjobFetch=asyncHandler(async (req, res) => {
 
  let aggregate =[

 
  {
    $lookup: {
      from: "clients",
      localField: "client_id",
      foreignField: "_id",
      as: "Clients"
    },
   
  },
  {
    $lookup: {
      from: "admins",
      localField: "created_by",
      foreignField: "_id",
      as: "done_by"
    },
   
  },
  {
    $sort: {
      createdAt: -1, // Sorting in descending order
    },
  }

  
 
  
 
]
if (req?.query?.status) {
  aggregate.unshift({
    $match: { status: { $in: [req?.query?.status] } }
  });
}

   
   
  
  
  let data =await job.aggregate(aggregate)



//   let query = {};

// if (req?.query?.status) {
//   query.status = req.query.status;
// }

// const page = parseInt(req.query.page) || 1;
// const limit = parseInt(req.query.limit) || 10;

// let data = await job
//   .find(query)

//   .populate({
//     path: "client_id",
  
//   })
//   .populate({
//     path: "created_by",
   
//   })
//   .skip((page - 1) * limit)
//   .limit(limit);

  try {
    success(res, 200, true, "Get Successfully", data);
  } catch (err) {
    throw new Error(err);
  } 
})
 router.get('/assignjob',methods.AssignjobFetch ); 

//  methods.getAlljobs=asyncHandler(async (req, res) => {
  
//   try {
//     success(res, 200, true, "Get Successfully", crud.getDocument(job,{...req?.query},{},{}));
//   } catch (err) {
//     throw new Error(err);
//   } 
// })
//  router.get('/',methods.getAlljobs );


 //getone

methods.getOne=asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(job, id, {}, {});
  if(!check) throw new Error('Data not Found!')
  try {

    const getSingle=await job.findById(id).populate({
      path: "client_id",
    }).populate({
      path: "assigneddata.assign",
      model: "admin",
      select:"name"
    })
  success(res, 200, true, "Get Successfully", getSingle);
  } catch (err) {
    throw new Error(err);
  } 
})
 router.get('/:id', methods.getOne)

 methods.getOneEdit=asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  validateId(id);
  const check = await crud.getOneDocumentById(job, id, {}, {});
  if(!check) throw new Error('Data not Found!')
  try {
  success(res, 200, true, "Get Successfully", await crud.getOneDocumentById(job, id,{},{}));
  } catch (err) {
    throw new Error(err);
  } 
})
 router.get('/edit/:id', methods.getOneEdit)


//Edit

methods.edit =asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(job,id,{},{});
  if (!check) throw new Error('Data not Found!')
  try {
let updateDate=await crud.updateById(job, id, req.body, { new: true })
success(res, 200, true, "Status Change Successfully", updateDate);


} 

   catch (err) {
    throw new Error(err);
  } 
})

 router.put('/status/:id',methods.edit )
methods.edit =asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(job,id,{},{});
  if (!check) throw new Error('Data not Found!')
  try {
let updateDate=await crud.updateById(job, id, req.body, { new: true })
if (Array.isArray(req.body.job_location) && req.body.job_location.length > 0) {
  await Promise.all(req.body.job_location.map(async (item) => {
    const dataExist = await locations.findOne({ name: item });
    if (!dataExist) {
      await locations.create({ name: item });
    }
  }));
}


if (req.body.skils && req.body.skils.length > 0) {
  await Promise.all(req.body.skils.map(async (item) => {
    const skillExist = await skils.findOne({ name: item });
    if (!skillExist) {
      await skils.create({ name: item });
    }
  }));
}

    success(res, 200, true, 'Update Successfully',updateDate );
  } catch (err) {
    throw new Error(err);
  } 
})

 router.put('/:id',methods.edit )


//delete
  .delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    const check = await crud.getOneDocumentById(job, id, {}, {});
    if(!check) throw new Error('Data not Found!')
    try {
      success(res, 200, true, "Delete Successfully", await crud.deleteById(job, id));
    } catch (err) {
      throw new Error(err);
    } 
}))











module.exports = router;