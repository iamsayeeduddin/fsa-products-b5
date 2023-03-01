const productRepo = require("../repositories/productRepo");
const logger = require("../utils/appLogger");
const reviewRepo = require("../repositories/reviewRepo");
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

const getOptions = (req) => {
  const page = +req.params.page || 1;
  const pageSize = +req.params.pageSize || 5;
  let sort = req.query.sort || "createdAt";
  let dir = req.query.dir || "desc";
  let search = req.query.search || "";

  return {
    page,
    pageSize,
    sort,
    dir,
    search,
  };
};

// /api/products/page/1/size/5?sort=price&dir=asc
const get = async (req, res) => {
  try {
    let options = getOptions(req);

    const data = await productRepo.get(options);
    const totalRecords = await productRepo.getCount(options);
    const totalPages = Math.ceil(totalRecords / options.pageSize);

    const response = {
      metadata: {
        totalRecords,
        totalPages,
      },
      data,
    };
    // logger.info("Get Request", response);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.log(err);
    logger.error(err);
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
    const reviews = await reviewRepo.getByProductId(id);

    const productJSON = product.toJSON();
    productJSON.reviews = reviews;

    res.status(200);
    res.json(productJSON);
  } catch (err) {
    console.log(err);
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
