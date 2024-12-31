const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { task, admin, job, employee } = require("../../utils/schemaMaster");
const { success } = require("../../utils/response");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const { NumberValueElement } = require("docx");

const crud = new crud_service();

const methods = { authAdmin };

// Create task
methods.add = asyncHandler(async (req, res) => {
  if (req?.user) {
    req.body.created_by = req.user._id;
    req.body.company_id = req.user.company_id;
    req.body.assignedBy = req.user._id;
  }

  try {
    const { other_tasks, job_id } = req.body;

    let jobIds = [];
    // If job_id is provided, find the job
    if (job_id) {
      const existingJob = await job.findOne({ job_id });
      if (!existingJob) {
        throw new Error("Job not found with the provided job_id.");
      }
      jobIds.push(existingJob._id); // Assign job ID to jobIds array
    }

    // If no job_id is provided, still create a task without associating it with any job
    if (job_id && jobIds.length === 0) {
      throw new Error("Job not found with the provided job_id.");
    }

    req.body.job = jobIds.length ? jobIds : undefined;  // Assign the job if exists, else leave undefined

    if (other_tasks) {
      req.body.other_tasks = other_tasks;
    }

    const taskData = {
      assignedTo: [],
      description: req.body.description || "",
      end_date: req.body.end_date || null,
      job: jobIds, // Use job instead of job_id (if any)
      parent_id: null,
      priority: req.body.priority || "Medium",
      start_date: req.body.start_date || null,
      status: req.body.status || "Pending",
      task_id: req.body.task_id || null,
      task_title: req.body.task_title || "Subtask",
      ...req.body, // Merge the rest of the request body
    };

    // Insert task data
    const addedTask = await crud.insertOne(task, taskData);

    // Populate task details
    const populatedTask = await task
      .findById(addedTask._id)
      .populate('assignedBy', 'name')
      .populate('job', 'job_id job_title'); // Populate job details if job exists

    // If other_tasks are present, we can include them in the populated task
    if (other_tasks) {
      populatedTask.other_tasks = other_tasks;
    }

    success(res, 201, true, "Task Created Successfully", populatedTask);
  } catch (err) {
    console.error("Error in adding task:", err.message);
    throw new Error(err.message);
  }
});





router.post('/', methods.authAdmin, methods.add);

// Get all tasks
methods.getAll = asyncHandler(async (req, res) => {
  const company_id = req?.user?.company_id || null;

  let filter = {};
  if (req.query.status) filter.status = { $in: req.query.status };
  if (req.query.task_title) {
    filter.task_title = { $regex: new RegExp(req.query.task_title, "i") };
  }
  if (req.query.assigned_to) filter.assign_task = { $in: req.query.assigned_to };
  if (req.query.created_by) filter.created_by = req.query.created_by;
  if (company_id) filter.company_id = company_id;

  const aggregate = [
    { 
      $lookup: {
        from: "admins",
        localField: "assign_task",
        foreignField: "_id",
        as: "assignedTo",
      },
    },
    { 
      $lookup: {
        from: "admins",
        localField: "assignedBy",
        foreignField: "_id",
        as: "assignedBy",
      },
    },
    { 
      $lookup: {
        from: "jobs",
        localField: "job",
        foreignField: "_id",
        as: "jobDetails",
      },
    },
    { 
      $project: {
        task_id: 1,
        task_title: 1,
        status: 1,
        start_date: 1,
        end_date: 1,
        tags: 1,
        description: 1,
        priority: 1,
        start_time:1,
        end_time:1,
        other_tasks:1,
        createdAt: 1,
        updatedAt: 1,
        parent_id:1,
        assignedTo: {
          $map: {
            input: "$assignedTo",
            as: "assignee",
            in: {
              _id: "$$assignee._id",
              name: "$$assignee.name",
              email: "$$assignee.email_id",
              user_role: "$$assignee.role",
              // designation: "$$assignee.designation",
              // department: "$$assignee.department",
            },
          },
        },
        assignedBy: {
          $arrayElemAt: ["$assignedBy", 0],
        },
        job: {
          $map: {
            input: "$jobDetails",
            as: "job",
            in: {
              job: "$$job._id",
              jobclient_id: "$$job.job_id",
              job_title: "$$job.job_title",
              client_name: "$$job.client_name",
              location: "$$job.location",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        task_id: { $first: "$task_id" },
        task_title: { $first: "$task_title" },
        status: { $first: "$status" },
        start_date: { $first: "$start_date" },
        end_date: { $first: "$end_date" },
        tags: { $first: "$tags" },
        description: { $first: "$description" },
        start_time: { $first: "$start_time" },
        end_time: { $first: "$end_time" },
        priority: { $first: "$priority" },
        other_tasks: {$first: "$other_tasks"},
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        assignedTo: { $first: "$assignedTo" },
        assignedBy: { $first: "$assignedBy" },
        job: { $first: "$job" },
        parent_id: { $first: "$parent_id" },

      },
    },
    { $sort: { start_date: -1 } },
  ];

  if (company_id) {
    aggregate.unshift({ $match: { company_id } });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  aggregate.push({ $skip: (page - 1) * limit }, { $limit: limit });

  try {
    const data = await task.aggregate(aggregate);
    const totalCount = await task.countDocuments(filter);

    success(res, 200, true, "Tasks Retrieved Successfully", {
      total: totalCount,
      data,
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/", methods.authAdmin, methods.getAll);

// Get one task
// methods.getOne = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateId(id);
//   const check = await crud.getOneDocumentById(task, id, {}, {});
//   if (!check) throw new Error('Task not found!');

//   try {
//     const taskDetails = await task.findById(id).populate({
//       path: "assign_task",
//       select: "name",
//     });
//     success(res, 200, true, "Task Retrieved Successfully", taskDetails);
//   } catch (err) {
//     throw new Error(err);
//   }
// });

// router.get('/:id', methods.getOne);

//get admin users
// Get all admins
// Get admins (no ID validation needed here)
methods.getAdmins = asyncHandler(async (req, res) => {
  const company_id = req?.user?.company_id || null; // Optional: Filter by company_id if needed
  console.log('Authenticated User:', req.user);  // Debugging log for checking the user object
  
  try {
    const filter = company_id ? { company_id, status: true } : { status: true };
    const admins = await admin.find(filter, "name email_id phone_number role");

    if (!admins.length) {
      return res.status(404).json({
        success: false,
        message: "No admins found",
      });
    }

    success(res, 200, true, "Admins retrieved successfully", admins);
  } catch (err) {
    console.error("Error in fetching admins:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching admin data.",
    });
  }
});

// Route for /adminusers
router.get("/adminusers", methods.authAdmin, methods.getAdmins);

// Edit task
methods.edit = asyncHandler(async (req, res) => {
  console.log("User  in request:", req.user);  // Check if req.user is set

  if (!req.user) {
      return res.status(401).json({
          success: false,
          message: 'User  is not authenticated. Please login and try again.'
      });
  }

  const { id } = req.params;
  console.log("ID from request params:", id); // Debugging line

  // Check if the ID is defined
  if (!id) {
      return res.status(400).json({
          success: false,
          message: 'ID is required.'
      });
  }

  // Check if the task exists
  const check = await crud.getOneDocumentById(task, id, {}, {});
  if (!check) {
      return res.status(404).json({
          success: false,
          message: 'Data not found!'
      });
  }

  try {
      req.body.updatedBy = req.user._id;  // Ensure req.user exists and has _id

      // Update the task
      let updatedTask = await crud.updateById(task, id, req.body, { new: true });

      return res.status(200).json({
          success: true,
          message: "Task updated successfully",
          data: updatedTask
      });
  } catch (err) {
      console.error("Error in updating task:", err);
      return res.status(500).json({
          success: false,
          message: 'An error occurred while updating the task.'
      });
  }
});

// Route definition
router.put('/:id', authAdmin, methods.edit);

//Patch the posted task
// Patch task: Update assign_task and job
methods.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameters
  validateId(id); // Validate that the ID is a valid MongoDB ObjectID

  let { assign_task, job, $pull, $push } = req.body; // Extract relevant fields from the request body

  // Handle $pull syntax for removing values
  if ($pull?.assign_task?.$in) {
    assign_task = $pull.assign_task.$in;
  }

  // Handle $push syntax for adding values
  if ($push?.assign_task) {
    assign_task = $push.assign_task;
  }

  console.log("Request Body:", req.body); // Log the request body for debugging
  console.log("Processed assign_task:", assign_task);

  // Ensure at least one of `assign_task` or `job` is provided
  if (!assign_task && !job) {
    return res.status(400).json({
      success: false,
      message: "At least one of assign_task or job is required for update.",
    });
  }

  try {
    // Find the task document by its unique ID
    const existingTask = await task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    // Validate and process `assign_task`
    if (assign_task && Array.isArray(assign_task) && assign_task.length > 0) {
      console.log("Original assign_task:", assign_task);

      // Validate ObjectId format and convert to ObjectId instances
      const invalidIds = assign_task.filter((id) => !mongoose.Types.ObjectId.isValid(id));
      if (invalidIds.length) {
        return res.status(400).json({
          success: false,
          message: `Invalid ObjectId(s) in assign_task: ${invalidIds.join(", ")}`,
        });
      }

      assign_task = assign_task.map((id) => new mongoose.Types.ObjectId(id));

      // Perform the `$pull` or `$push` operation based on the request
      if ($pull) {
        await task.updateOne(
          { _id: id },
          { $pull: { assign_task: { $in: assign_task } } }
        );
      }

      if ($push) {
        await task.updateOne(
          { _id: id },
          { $addToSet: { assign_task: { $each: assign_task } } }
        ); // Prevent duplicates with `$addToSet`
      }
    }

    // Validate and process `job`
    if (job && Array.isArray(job)) {
      console.log("Original job:", job);

      // Deduplicate and validate job ObjectIds
      const uniqueJobs = [
        ...new Set([...existingTask.job.map(String), ...job]),
      ];
      const invalidJobIds = uniqueJobs.filter((id) => !mongoose.Types.ObjectId.isValid(id));

      if (invalidJobIds.length) {
        return res.status(400).json({
          success: false,
          message: `Invalid ObjectId(s) in job: ${invalidJobIds.join(", ")}`,
        });
      }

      existingTask.job = uniqueJobs.map((id) => new mongoose.Types.ObjectId(id));
      console.log("Parsed job:", existingTask.job);
    }

    // Save the updated task
    existingTask.updatedBy = req.user._id; // Track the user making the update
    const updatedTask = await existingTask.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (err) {
    console.error("Error in updating task:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the task.",
    });
  }
});

// Route for patching task
router.patch('/:id', authAdmin, methods.updateTask);


////

// Delete task
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const check = await crud.getOneDocumentById(task, id, {}, {});
  if (!check) throw new Error('Task not found!');

  try {
    success(res, 200, true, "Task Deleted Successfully", await crud.deleteById(task, id));
  } catch (err) {
    throw new Error(err);
  }
}));

module.exports = router;
