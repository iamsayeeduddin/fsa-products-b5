const User = require("../models/userModel");

const register = (data) => {
  const user = new User(data);
  return user.save();
};

const getUser = (data) => {
  return User.findOne({ email: data.email }, { __v: 0, _id: 0, active: 0 });
};

module.exports = { register, getUser };
