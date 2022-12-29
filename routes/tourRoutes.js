const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

// check params middleware
router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(middleware, tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;