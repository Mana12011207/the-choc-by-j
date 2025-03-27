import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  deliveryLocation: { type: String, required: true },
  deliveryDate: { type: Date },
  Products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
