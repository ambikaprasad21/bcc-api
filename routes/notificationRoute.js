const express = require("express");
const notificationController = require("./../controllers/notificationController");
const authenticationController = require("./../controllers/authenticationController");

const router = express.Router();

router
  .route("/")
  .get(authenticationController.protect, notificationController.getNotifi)
  .post(notificationController.createNotifi);

router
  .route("/:id")
  .get(authenticationController.protect, notificationController.getNotifiById)
  .patch(
    authenticationController.protect,
    notificationController.updateNotifiById
  )
  .delete(
    authenticationController.protect,
    notificationController.deleteNotifi
  );

module.exports = router;
