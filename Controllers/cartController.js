const User = require('../Models/User');
const Product = require('../Models/Product');

// Function to add or remove product from cart
exports.updateCart = async (req, res) => {
  const { userID, productID, count, bookingStartDate, bookingEndDate } = req.body;

  try {
    // Find user by userID
    let user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find product by productID
    let product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if count is more than units available
    if (count > product.unitsAvailable) {
      return res.status(400).json({ message: `Only ${product.unitsAvailable} units available` });
    }

    // Calculate rentedAtPrice based on current rental price
    const rentedAtPrice = `${product.rentalPricePerWeek}/week, ${product.rentalPricePerMonth}/month`;

    // Check if product is already in user's cart
    const index = user.cart.findIndex(item => item.productID.toString() === productID);

    if (index === -1) {
      // Add product to cart
      user.cart.push({ productID, count, bookingStartDate, bookingEndDate, rentedAtPrice });
    } else {
      // Remove product from cart
      user.cart.splice(index, 1);
    }

    // Save updated user with cart
    await user.save();

    // Fetch updated cart products with details
    const updatedCart = await User.findById(userID).populate('cart.productID', 'title thumbnailURL sellerUsername unitsAvailable productType');

    // Respond with success and updated cart products
    res.status(200).json(updatedCart.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
