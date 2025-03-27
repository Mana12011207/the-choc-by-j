import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String, required: true },
  storageInstruction: { type: String, require: true },
  leadTime: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
