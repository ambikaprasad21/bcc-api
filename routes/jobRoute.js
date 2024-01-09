const express = require("express");
const authenticationController = require("./../controllers/authenticationController");
const jobController = require("./../controllers/jobController");
const router = express.Router();

router
  .route("/")
  .post(authenticationController.protect, jobController.createJob)
  .get(jobController.getAllJob);

router
  .route("/:id")
  .get(jobController.getJobById)
  .delete(authenticationController.protect, jobController.deleteJob);

module.exports = router;
