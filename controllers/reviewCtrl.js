const reviewRepo = require("../repositories/reviewRepo");
const logger = require("../utils/appLogger");

const post = async (req, res) => {
  try {
    const data = req.body;
    data.productId = req.params.id;
    data.createdAt = new Date();
    await reviewRepo.create(data);
    res.status(201);
    res.send();
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Internal Server Error");
  }
};

module.exports = {
  post,
};
