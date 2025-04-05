import mongoose from "mongoose";

//Define Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: false },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    storageInstruction: { type: String, required: true },
    leadTime: { type: String, required: true },
    imageUrl: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    allergen: { type: String, required: true },
  },
  { timestamps: true }
);

//Define Product Model
const Product = mongoose.model("Product", productSchema);

export default Product;
