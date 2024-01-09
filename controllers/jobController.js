const catchAsync = require("./../utils/catchAsync");
const jobModel = require("./../models/jobModel");

exports.createJob = catchAsync(async (req, res, next) => {
  const doc = await jobModel.create(req.body);
  res.status(200).json({
    status: "success",
    doc: doc,
  });
});

exports.getAllJob = catchAsync(async (req, res, next) => {
  const doc = await jobModel.find().sort({ _id: -1 });
  res.status(200).json({
    status: "success",
    doc: doc,
  });
});

exports.getJobById = catchAsync(async (req, res, next) => {
  const doc = await jobModel.find({ slug: req.params.id });
  res.status(200).json({
    status: "success",
    doc: doc,
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const doc = await jobModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
  });
});
