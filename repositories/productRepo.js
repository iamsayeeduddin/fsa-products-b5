const ProductModel = require("../models/productModel");

const get = (options) => {
  let { page, pageSize, sort, dir, search } = options;

  let filter = {
    $or: [{ brand: { $regex: search, $options: "i" } }, { model: { $regex: search, $options: "i" } }],
  };

  return ProductModel.find(filter, { __v: 0 })
    .sort({ [sort]: dir })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
};

const getCount = (options) => {
  const { search } = options;
  let filter = {
    $or: [{ brand: { $regex: search, $options: "i" } }, { model: { $regex: search, $options: "i" } }],
  };
  return ProductModel.count(filter);
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
  getCount,
};
