const express = require('express')

const router = express.Router()
const {getOrder, makeOrder} = require('../controller/orderController')

router.get('/all-orders', getOrder)
router.post('/make-order', makeOrder)

module.exports = router