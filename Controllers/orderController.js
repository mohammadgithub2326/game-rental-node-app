const User = require('../Models/User');
const Product = require('../Models/Product');

exports.placeOrder = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await User.findById(userID).populate('cart.productID');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productsOrdered = [];

    for (const item of user.cart) {
      const product = item.productID;

      if (item.count > product.unitsAvailable) {
        return res.status(400).json({ message: `Only ${product.unitsAvailable} units available for ${product.title}` });
      }

      productsOrdered.push({
        productID: product._id,
        title: product.title,
        thumbnailURL: product.thumbnailURL,
        sellerUsername: product.sellerUsername,
        unitsAvailable: product.unitsAvailable - item.count,
        productType: product.productType,
        bookingStartDate: item.bookingStartDate,
        bookingEndDate: item.bookingEndDate,
        rentedAtPrice: item.rentedAtPrice
      });

      product.unitsAvailable -= item.count;
      await product.save();
    }

    user.orders.push(...user.cart);
    user.cart = [];
    await user.save();

    res.status(200).json(productsOrdered);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
