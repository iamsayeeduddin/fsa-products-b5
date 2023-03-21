const userRepo = require("../repositories/userRepo");
const logger = require("../utils/appLogger");
const crypt = require("../utils/crypt");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

const post = async (req, res) => {
  try {
    logger.info("Saving the Data to DB!");
    const data = req.body;
    data.createdAt = new Date();
    data.password = await crypt.getHash(data.password);
    await userRepo.register(data);
    logger.info("Data Saved to the Db!");
    res.status(201);
    res.send();
  } catch (e) {
    logger.error(e);
    if (e && e.message.indexOf("duplicate key error") > -1) {
      res.status(400);
      res.send("Email Already Exists!");
    } else {
      res.status(500);
      res.send("Internal Server Error");
    }
  }
};

const signin = async (req, res) => {
  const data = req.body;
  const user = await userRepo.getUser(data);

  if (!user) {
    res.status(401);
    res.send("Wrong Email or Password!");
  } else {
    const response = await crypt.comparePass(data.password, user.password);
    if (response) {
      res.status(200);
      const token = auth.generateTokens({ email: user.email, role: user.role });
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401);
      res.send("Wrong Email or Password");
    }
  }
};

module.exports = { post, signin };

//
// Encryption - password - (key) adonkononda - (key) password
// Hashing - irreversible
//
