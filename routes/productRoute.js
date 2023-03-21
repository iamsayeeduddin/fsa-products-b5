const express = require("express");
const router = express.Router();
const productCtrl = require("./../controllers/productCtrl");
const auth = require("../utils/auth");

// CRUD
// GET/Read Route
router.get("/", productCtrl.get);
router.get("/page/:page/size/:pageSize", productCtrl.get);
router.get("/:id", productCtrl.getById);

// Create / POST
router.post("/", auth.tokenAuth, productCtrl.create);

// Delete / Remove
router.delete("/:id", auth.tokenAuth, auth.authorizeAdmin, productCtrl.remove);

//Update
router.put("/:id", productCtrl.update);
router.patch("/:id", productCtrl.patch);

module.exports = router;

// USer Roles/ User Personas
// Admin
// User
// Super Admin
// STaff
// Editor
