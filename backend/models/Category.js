import mongoose from "mongoose";

// Define Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true, Timestamp: true },
});

// Define Category Model
const Category = mongoose.model("Category", CategorySchema);

export default Category;
