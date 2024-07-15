const express = require("express");
const breakingNewsController = require("../controllers/breakingNewsConroller");
const authenticationController = require("./../controllers/authenticationController");
const router = express.Router();

router
  .route("/")
  .get(breakingNewsController.getBreakNews)
  .post(
    authenticationController.protect,
    breakingNewsController.createBreakNews
  );

router
  .route("/:id")
  .delete(
    authenticationController.protect,
    breakingNewsController.deleteBreakNews
  );

module.exports = router;
