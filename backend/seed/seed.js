import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//  * Reads a JSON file from the given file path and inserts the data into the specified Mongoose model.
async function importJsonToDatabase(filePath, Model) {
  try {
    //Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }
    // Read and parse the JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`${Model.modelName} data loaded from ${filePath}:`, jsonData);

    // Insert the parsed data into the database
    await Model.insertMany(jsonData);
    console.log(`${Model.modelName} data imported successfully`);
  } catch (error) {
    console.error(`Error importing ${Model.modelName} data from ${filePath}`);
  }
}

// Main function to seed the database with initial data
async function importData() {
  try {
    // MongoDB connection
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@thechocbyj-dev.etc1o88.mongodb.net/thechocbyj?retryWrites=true&w=majority&appName=TheChocByJ-Dev`
    );
    console.log("Connected to MongoDB!");

    // Delete existing data from collections to prevent duplicate entries
    await Category.deleteMany({});
    console.log("Existing categories droppped");
    await Product.deleteMany({});
    console.log("Existing products droppped");
    await User.deleteMany({});
    console.log("Existing users droppped");

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

importData();
