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

module.exports = { authenticate };
