const express = require("express");
const breakingNewsController = require("../controllers/breakingNewsConroller");

const router = express.Router();

router
  .route("/")
  .get(breakingNewsController.getBreakNews)
  .post(breakingNewsController.createBreakNews);

router.route("/:id").delete(breakingNewsController.deleteBreakNews);

module.exports = router;
