const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/reviewCtrl");
// const reviewsModel = require("../models/reviewsModel");

router.post("/:id", reviewCtrl.post);

module.exports = router;
