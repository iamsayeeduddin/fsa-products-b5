const ProductModel = require("../models/productModel");
const productRepo = require("../repositories/productRepo");

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
    const product = await productRepo.get();
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(500);
    res.send("Internal server error!");
  }
};

const create = async (req, res) => {
  const product = await productRepo.create(req.body);
  product.save();
  res.status(201);
  res.send();
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productRepo.getById(id);
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(500);
    res.send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await productRepo.remove(id);
    res.status(200);
    res.send();
  } catch (err) {
    res.status(500);
    res.send();
  }
};

// Full Update
const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await productRepo.update(id, body);
  res.status(204);
  res.send();
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await productRepo.patch(id, body);
  res.status(204);
  res.send();
};

module.exports = { get, create, getById, remove, update, patch };
