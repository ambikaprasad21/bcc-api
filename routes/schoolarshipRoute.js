const express = require("express");
const schoolarshipController = require("./../controllers/schloorshipController");

const router = express.Router();

router
  .route("/")
  .get(schoolarshipController.getAllEntrySchoolarship)
  .post(schoolarshipController.createEntry);

router.route("/sort-by-date").get(schoolarshipController.sortByDate);
router.route("/sort-by-fresh").get(schoolarshipController.sortByFresh);
router.route("/sort-by-renewal").get(schoolarshipController.sortByRenewal);
router.route("/sort-by-payment").get(schoolarshipController.sortByPaid);

router
  .route("/:id")
  .patch(schoolarshipController.updateEntry)
  .delete(schoolarshipController.deleteEntry);

router
  .route("/getEntryByName/:name")
  .get(schoolarshipController.getEntryByName);

router
  .route("/getEntryByRegno/:regno")
  .get(schoolarshipController.getEntryByRegNo);
module.exports = router;
