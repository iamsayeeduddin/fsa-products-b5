const express = require('express')
const router = express.Router()
const homeCtrl = require('./../controllers/homeCtrl')

router.get('/', homeCtrl.get)
router.get('/health', homeCtrl.health)

module.exports = router