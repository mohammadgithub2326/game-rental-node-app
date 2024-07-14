const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/wishlistController');

// Route for updating wishlist (add/remove product)
router.put('/wishlist', wishlistController.saveRemoveWishlist);

module.exports = router;
