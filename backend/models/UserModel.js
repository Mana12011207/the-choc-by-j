import mongoose from "mongoose";

//Define User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: {
        type: String,
        required: false,
        unique: false,
      },
      city: {
        type: String,
        required: false,
        unique: false,
      },
      state: {
        type: String,
        required: false,
        unique: false,
      },
      postcode: {
        type: String,
        required: false,
        unique: false,
      },
    },
    phone: { type: String, required: false, unique: true },
  },
  { timestamps: true }
);

// Define User Model
const User = mongoose.model("User", userSchema);

export default User;
