const mongoose = require('mongoose');

// Customer Schema
const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

// Customer Model
const customer = mongoose.model('customer', customerSchema);

// Export the Customer Model
module.exports = customer;
