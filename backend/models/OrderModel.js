import mongoose from "mongoose";

//Define Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (phone) {
          const lastNameRegex = /^[0-9]+$/;
          return lastNameRegex.test(phone);
        },
        message: "Phone number can be contain only numbers.",
      },
    },
    deliveryLocation: { type: String, required: true },
    deliveryDate: { type: Date },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer"],
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//Define Order Model
const Order = mongoose.model("Order", orderSchema);
export default Order;
