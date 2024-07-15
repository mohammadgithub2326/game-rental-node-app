const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

router.post('/PlaceOrder', orderController.placeOrder);

module.exports = router;
