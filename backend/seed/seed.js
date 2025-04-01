import mongoose from "mongoose";
import Category from "../models/Category.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function importCategories() {
  try {
    // MongoDB connection
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@thechocbyj-dev.etc1o88.mongodb.net/thechocbyj?retryWrites=true&w=majority&appName=TheChocByJ-Dev`
    );

    // Construct the path to categories.json
    const filePath = path.resolve(__dirname, "data/categories.json");
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    // Read categories.json
    const data = fs.readFileSync("data/categories.json", "utf-8");
    const categories = JSON.parse(data); // Parse JSON data
    console.log("Categories data:", categories);

    // Save categories to database
    for (const data of categories) {
      const category = new Category({
        name: data.name,
        subcategories: data.subcategories,
      });
      await category.save();
    }
    console.log("Categories imported successfully");
  } catch (error) {
    console.error("Error importing categories", error);
  } finally {
    await mongoose.disconnect();
  }
}

importCategories();
