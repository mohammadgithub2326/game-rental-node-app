const express = require('express');
const router = express.Router();
const productsController = require('../Controllers/productsController');

// Route for fetching all products
router.get('/Homepage', productsController.getAllProducts,);
router.post('/CreateProduct', productsController.createProduct);
router.put('/UpdateProduct', productsController.updateProduct);
router.get('/ProductDetails/:productID', productsController.getProductById);



module.exports = router;
