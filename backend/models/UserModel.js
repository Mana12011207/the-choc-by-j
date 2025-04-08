import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Define User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
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
  //Enable automatic timestams for creation and updates
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

//Password comparison method (used during login)
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Define User Model
const User = mongoose.model("User", userSchema);

export default User;
