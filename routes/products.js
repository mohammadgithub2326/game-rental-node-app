const express = require('express');
const router = express.Router();
const productsController = require('../Controllers/productsController');

// Route for fetching all products
router.get('/products', productsController.getAllProducts,);
router.post('/products', productsController.createProduct);
router.put('/products', productsController.updateProduct);
router.get('/product/:productID', productsController.getProductById);



module.exports = router;
