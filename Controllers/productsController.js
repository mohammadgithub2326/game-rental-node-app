const Product = require('../Models/Product');

// Function to fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, {
      productID: 1,
      title: 1,
      thumbnailURL: 1,
      sellerUsername: 1,
      unitsAvailable: 1,
      productType: 1,
      rentalPricePerWeek: 1,
      rentalPricePerMonth: 1,
      _id: 0 // Exclude _id from the response
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//----------------------------------------------------------------------------------------------------------


// Function to create a new product
exports.createProduct = async (req, res) => {
    const {
      title,
      thumbnailURL,
      sellerUsername,
      unitsAvailable,
      productType,
      productImages,
      rentalPricePerWeek,
      rentalPricePerMonth
    } = req.body;
    console.log(req.body)
  
    // Check if all required fields are provided
    if (!title || !thumbnailURL || !sellerUsername || !unitsAvailable || !productType ||
        !rentalPricePerWeek || !rentalPricePerMonth) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    try {
      // Create new product
      const newProduct = new Product({
        title,
        thumbnailURL,
        sellerUsername,
        unitsAvailable,
        productType,
        productImages,
        rentalPricePerWeek,
        rentalPricePerMonth
      });
  
      // Save product to database
      await newProduct.save();
  
      // Respond with success message and product data
      res.status(200).json({
        productID: newProduct._id,
        title: newProduct.title,
        thumbnailURL: newProduct.thumbnailURL,
        sellerUsername: newProduct.sellerUsername,
        unitsAvailable: newProduct.unitsAvailable,
        productType: newProduct.productType,
        productImages: newProduct.productImages,
        rentalPricePerWeek: newProduct.rentalPricePerWeek,
        rentalPricePerMonth: newProduct.rentalPricePerMonth
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

//-------------------------------------------------------------------------------------------------------------

  // Function to update product details
exports.updateProduct = async (req, res) => {
    const {
      productID,
      title,
      thumbnailURL,
      sellerUsername,
      unitsAvailable,
      productType,
      productImages,
      rentalPricePerWeek,
      rentalPricePerMonth
    } = req.body;
  
    try {
      // Check if productID is provided
      if (!productID) {
        return res.status(400).json({ message: 'ProductID is required' });
      }
  
      // Check if the product exists
      let product = await Product.findById(productID);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update product fields
      product.title = title;
      product.thumbnailURL = thumbnailURL;
      product.sellerUsername = sellerUsername;
      product.unitsAvailable = unitsAvailable;
      product.productType = productType;
      product.productImages = productImages;
      product.rentalPricePerWeek = rentalPricePerWeek;
      product.rentalPricePerMonth = rentalPricePerMonth;
  
      // Save updated product
      await product.save();
  
      // Respond with success and updated product data
      res.status(200).json({
        productID: product._id,
        title: product.title,
        thumbnailURL: product.thumbnailURL,
        sellerUsername: product.sellerUsername,
        unitsAvailable: product.unitsAvailable,
        productType: product.productType,
        productImages: product.productImages,
        rentalPricePerWeek: product.rentalPricePerWeek,
        rentalPricePerMonth: product.rentalPricePerMonth
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

//----------------------------------------------------------------------------------------------------------------
  // Function to get product details by ID
exports.getProductById = async (req, res) => {
    const { productID } = req.params;
    console.log(productID);
  
    try {
      // Find product by ID
      const product = await Product.findById(productID);
  
      // Check if product exists
      if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
      }
  
      // Respond with product details
      res.status(200).json({
        productID: product._id,
        title: product.title,
        thumbnailURL: product.thumbnailURL,
        sellerUsername: product.sellerUsername,
        unitsAvailable: product.unitsAvailable,
        productType: product.productType,
        productImages: product.productImages,
        rentalPricePerWeek: product.rentalPricePerWeek,
        rentalPricePerMonth: product.rentalPricePerMonth
      });
    } catch (err) {
      res.status(404).json({ message: 'fetching error ' + err });
    }
  };