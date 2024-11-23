const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { addjob } = require("../../utils/schemaMaster");
const { success } = require("../../utils/response");
const crud_service = require("../../utils/crud_service");
const validateId = require('../../utils/validateId');
const { authAdmin } = require('../../middlewares/authMiddlewares');
const upload = require('../../utils/upload');
const JobCreateSendMail = require("../../utils/JobCreatedMail");

const crud = new crud_service();

// Middleware to authenticate admin
router.use(authAdmin);

// Create a new job
router.post('/', asyncHandler(async (req, res) => {
  const jobData = req.body;
  const newJob = new addjob(jobData);
  await newJob.save();

  // Optionally send a mail after job creation
  JobCreateSendMail(newJob);

  res.status(201).json({ message: 'Job created successfully', job: newJob });
}));

// Get all jobs
router.get('/', asyncHandler(async (req, res) => {
  const jobs = await addjob.find();
  res.status(200).json(jobs);
}));

// Get a job by ID
router.get('/:id', validateId, asyncHandler(async (req, res) => {
  const job = await addjob.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(200).json(job);
}));

// Update a job
router.put('/:id', validateId, asyncHandler(async (req, res) => {
  const updatedJob = await addjob.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedJob) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
}));

// Delete a job
router.delete('/:id', validateId, asyncHandler(async (req, res) => {
  const deletedJob = await addjob.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(200).json({ message: 'Job deleted successfully' });
}));

module.exports = router;