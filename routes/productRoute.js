const express = require("express");
const router = express.Router();
const productCtrl = require("./../controllers/productCtrl");

// GET/Read Route
router.get("/products", productCtrl.get);

// Create / POST
router.post("/products", productCtrl.create);

module.exports = router;
