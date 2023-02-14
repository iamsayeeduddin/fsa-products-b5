const productModel = require('../models/productModel')

const get = (req, res) => {
    productModel.find().then((result) => {
        res.status(200)
        res.json(result)
    }
    ).catch((err) => {
        res.status(500)
        res.send("Internal server Error")
    })
}

module.exports = {get}