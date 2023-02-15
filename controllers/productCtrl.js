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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({ _id: id });
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
    await ProductModel.findOneAndDelete({ _id: id });
    res.status(200);
    res.send();
  } catch (err) {
    res.status(500);
    res.send();
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await ProductModel.findOneAndUpdate(
    { _id: id },
    {
      brand: body.brand,
      model: body.model,
      price: body.price,
      inStock: body.inStock,
      category: body.category,
    }
  );
  res.status(201);
  res.send();
};

module.exports = { get, create, getById, remove, update };
