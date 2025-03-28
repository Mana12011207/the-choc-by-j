import mongoose from "mongoose";

//Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    purchseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define User Model
const User = mongoose.model("User, userSchema");

export default User;
