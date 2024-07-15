const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/wishlistController');

// Route for updating wishlist (add/remove product)
router.put('/Save/Remove from Wishlist', wishlistController.saveRemoveWishlist);

module.exports = router;
