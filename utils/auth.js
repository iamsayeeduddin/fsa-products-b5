const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (auth) {
    const authKey = auth.split(" ");
    const encode = authKey[1];
    const buff = Buffer.from(encode, "base64");
    const decode = buff.toString("utf-8");
    const str = decode.split(":");
    const [username, password] = str;

    if (username == "admin" && password == "password") {
      next();
    } else {
      res.status(401);
      res.send("Unauthorized!");
    }
  } else {
    res.status(401);
    res.send("Unauthorized!");
  }
}

function generateTokens(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "10m" });
}

function tokenAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401);
      res.send("Unauthorized");
    } else {
      const tokens = authHeader.split(" ");
      const jwtToken = tokens[1];
      const response = jwt.verify(jwtToken, config.jwtSecret);
      if (response) {
        req.role = response.role;
        next();
      } else {
        res.status(401);
        res.send("Unauthorized");
      }
    }
  } catch (err) {
    res.status(401);
    res.send("Unauthorized");
  }
}

function authorizeAdmin(req, res, next) {
  const role = req.role;
  if (role === "Admin") {
    next();
  } else {
    res.status(403);
    res.send("Forbidden");
  }
}
module.exports = { authenticate, generateTokens, tokenAuth, authorizeAdmin };
