const User = require('../Models/User');
const Product = require('../Models/Product');

// Function to add or remove product from wishlist

exports.saveRemoveWishlist = async (req, res) => {
  const { userID, productID } = req.body;
  console.log(req.body)

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wishlistIndex = user.wishlist.findIndex(item => item.productID.toString() === productID);

    if (wishlistIndex !== -1) {
      user.wishlist.splice(wishlistIndex, 1); // Remove from wishlist
    } else {
      user.wishlist.push({ productID }); // Add to wishlist
    }

    await user.save();

    // Fetch details for each product in the wishlist
    const wishlistDetails = await Promise.all(
      user.wishlist.map(async item => {
        const productDetails = await Product.findById(item.productID);
        return {
          productID: productDetails._id,
          title: productDetails.title,
          thumbnailURL: productDetails.thumbnailURL,
          sellerUsername: productDetails.sellerUsername,
          unitsAvailable: productDetails.unitsAvailable,
          productType: productDetails.productType,
          rentalStartingFromPrice: productDetails.rentalPricePerWeek
        };
      })
    );

    res.status(200).json(wishlistDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

