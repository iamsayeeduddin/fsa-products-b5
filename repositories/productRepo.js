const ProductModel = require("../models/productModel");

const get = () => {
  return ProductModel.find({}, { __v: 0 });
};

const create = (data) => {
  const product = new ProductModel(data);
  return product.save();
};

const getById = (id) => {
  return ProductModel.findOne({ _id: id }, { __v: 0 });
};

const remove = (id) => {
  return ProductModel.findOneAndDelete({ _id: id });
};

const update = (id, data) => {
  return ProductModel.findOneAndUpdate(
    { _id: id },
    {
      brand: data.brand,
      model: data.model,
      price: data.price,
      inStock: data.inStock,
      category: data.category,
    }
  );
};

const patch = (id, data) => {
  return ProductModel.findOneAndUpdate({ _id: id }, data);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
  patch,
};
