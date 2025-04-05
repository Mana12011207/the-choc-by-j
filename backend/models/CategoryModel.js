import mongoose from "mongoose";

// Define Sub Category Schema
const subCategorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
});

// Define Category Schema
const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: { type: String, required: true },

    subCategories: {
      type: [subCategorySchema],
      // Set the default value to an empty array to prevent errors when subcategories are unddefined.
      default: [],
    },
  },
  { timestamps: true }
);

// Define Models
const Category = mongoose.model("Category", categorySchema);
export default Category;
