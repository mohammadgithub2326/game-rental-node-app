const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

router.post('/Place Order', orderController.placeOrder);

module.exports = router;
