const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  billAmount: {
    type: Number,
    required: true,
  },
  delivery: {
    deliveryAddress: {
      type: String,
    },
    deliveryFee: {
      type: Number,
    },
    deliveryStatus: {
      type: String,
      default: "Pending",
    },
  },
  orderData: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      quantity: {
        type: Number,
        required: true,
      },
      appliedDisPecentage: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
