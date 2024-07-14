const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Seller', 'Gamer'],
    required: true
  },
  wishlist: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }
  ],

  cart: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      count: { type: Number, required: true },
      bookingStartDate: { type: Date, required: true },
      bookingEndDate: { type: Date, required: true },
      rentedAtPrice: { type: String, required: true }
    }
  ],
  
  orders: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      count: { type: Number, required: true },
      bookingStartDate: { type: Date, required: true },
      bookingEndDate: { type: Date, required: true },
      rentedAtPrice: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
