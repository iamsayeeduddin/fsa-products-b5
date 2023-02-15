const ProductModel = require("../models/productModel");

// const get = (req, res) => {
//     productModel.find().then((result) => {
//         res.status(200)
//         res.json(result)
//     }
//     ).catch((err) => {
//         res.status(500)
//         res.send("Internal server Error")
//     })
// }

// GET Request / READ

const get = async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(500);
    res.send("Internal server error!");
  }
};

const create = (req, res) => {
  const product = new ProductModel(req.body);
  product.save();
  res.status(201);
  res.send();
};

module.exports = { get, create };
