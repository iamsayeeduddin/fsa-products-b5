const express = require("express");
const router = express.Router();
const productCtrl = require("./../controllers/productCtrl");

// CRUD
// GET/Read Route
router.get("/", productCtrl.get);
router.get("/page/:page/size/:pageSize", productCtrl.get);
router.get("/:id", productCtrl.getById);

// Create / POST
router.post("/", productCtrl.create);

// Delete / Remove
router.delete("/:id", productCtrl.remove);

//Update
router.put("/:id", productCtrl.update);
router.patch("/:id", productCtrl.patch);

module.exports = router;
