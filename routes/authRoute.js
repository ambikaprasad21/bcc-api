const express = require("express");
const authenticationController = require("./../controllers/authenticationController");
const router = express.Router();

router.route("/login").post(authenticationController.login);
router.route("/logout").get(authenticationController.logout);
router.route("/islogged").get(authenticationController.protect);
router.route("/getloggedinuser").get(authenticationController.getLoggedInUser);

module.exports = router;
