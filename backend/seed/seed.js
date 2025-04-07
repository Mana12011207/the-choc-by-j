import databaseConnect from "../databaseConnect.js";
import Category from "./models/CategoryModel.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import path from "path";
import fs from "fs";

const importJsonToDatabase = async (filePath, Model) => {
  try {
    // Check if the specified file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }
    // Read the JSON file and parse its content
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`${Model.modelName} data loaded from ${filePath}:`, jsonData);

    // Insert the parse data into the MongoDB collection via the provided Mongoose model
    await Model.insertMany(jsonData);
    console.log(`${Model.modelName} data imported successfully!`);
  } catch (error) {
    console.error(
      `Error importing ${Model.modelName} data from ${filePath}:`,
      error.message
    );
  }
};

const importData = async () => {
  try {
    // Connect to the MongoDB database
    await databaseConnect();

    // Drop all existing data from the Category collection
    await Category.deleteMany({});
    console.log("Existing categories deleted.");
    // Drop all existing data from the User collection
    await User.deleteMany({});
    console.log("Existing users deleted.");
    // Drop all existing data from the Product collection
    await Product.deleteMany({});
    console.log("Existing products deleted.");

    // Resolve the file paths to the JSON data files
    const categoriesFilePath = path.resolve("./data/categories.json");
    const usersFilePath = path.resolve("./data/users.json");
    const productsFilePath = path.resolve("./data/products.json");

    // Import data into the Category, User and Product collections from the JSON file
    await importJsonToDatabase(categoriesFilePath, Category);
    await importJsonToDatabase(usersFilePath, User);
    await importJsonToDatabase(productsFilePath, Product);

    console.log("All data imported successfully!");
  } catch (error) {
    console.error("An error occurred during data import:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

importData();
