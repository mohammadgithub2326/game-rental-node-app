const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// Route for updating cart (add/remove product)
router.put('/Add/Remove from the Cart', cartController.updateCart);

module.exports = router;
