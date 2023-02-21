const express = require("express");
const router = express.Router();
const productCtrl = require("./../controllers/productCtrl");

// CRUD
// GET/Read Route
// router.get("/products", productCtrl.get);
router.get("/products/:page/:pageSize", productCtrl.get);
router.get("/products/:id", productCtrl.getById);

// Create / POST
router.post("/products", productCtrl.create);

// Delete / Remove
router.delete("/products/:id", productCtrl.remove);

//Update
router.put("/products/:id", productCtrl.update);
router.patch("/products/:id", productCtrl.patch);

module.exports = router;
