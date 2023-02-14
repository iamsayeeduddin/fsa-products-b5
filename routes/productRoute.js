const express = require("express")
const router = express.Router()
const productCtrl = require('./../controllers/productCtrl')


router.get('/products', productCtrl.get)

module.exports = router