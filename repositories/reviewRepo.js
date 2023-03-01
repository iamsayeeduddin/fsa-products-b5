const ReviewModel = require("../models/reviewsModel");

const create = (data) => {
  const review = new ReviewModel(data);
  return review.save();
};

const getByProductId = (productId) => {
  return ReviewModel.find({ productId });
};

module.exports = {
  create,
  getByProductId,
};
