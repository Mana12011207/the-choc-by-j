import mongoose from "mongoose";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { json } from "express/lib/response.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function importJsonToDatabase(filePath, Model) {
  try {
    //Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }
    // Read json data
    const jsonData = json.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`${Model.modelName} data loaded from ${filePath}:`, jsonData);

    // Save data to the database
    await Model.insertMany(jsonData);
    console.log(`${Model.modelName} data imported successfully`);
  } catch (error) {
    console.error(`Error importing ${Model.modelName} data from {filePath}`);
  }
}

async function importData() {
  try {
    // MongoDB connection
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@thechocbyj-dev.etc1o88.mongodb.net/thechocbyj?retryWrites=true&w=majority&appName=TheChocByJ-Dev`
    );
    console.log("Connected to MongoDB!");

    // Construct the path to categories.json
    const categoriesFilePath = path.resolve(__dirname, "data/categories.json");
    await importJsonToDatabase(categoriesFilePath, Category);

    // Construct the path to users.json
    const usersFilePath = path.resolve(__dirname, "data/users.json");
    await importJsonToDatabase(usersFilePath, User);

    // Construct the path to products.json
    const productsFilePath = path.resolve(__dirname, "data/products.json");
    await importJsonToDatabase(productsFilePath, Product);
  } catch (error) {
    console.error("Error importing data", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

importCategories();
