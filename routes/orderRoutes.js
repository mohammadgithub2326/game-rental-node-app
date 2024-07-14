const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

router.post('/order', orderController.placeOrder);

module.exports = router;
