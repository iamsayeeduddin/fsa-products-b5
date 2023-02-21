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
    const page = +req.params.page;
    const pageSize = +req.params.pageSize;
    const product = await productRepo.get(page, pageSize);
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(500);
    res.send("Internal server error!");
  }
};

const create = async (req, res) => {
  try {
    const product = await productRepo.create(req.body);
    product.save();
    res.status(201);
    res.send();
  } catch (err) {
    if (err && err.message.indexOf("validation failed") > -1) {
      res.status(400);
      res.send("Bad Request");
    } else {
      res.status(500);
      res.send(err);
    }
  }
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
