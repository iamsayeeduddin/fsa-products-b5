const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", userSchema);
