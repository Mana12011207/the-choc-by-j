import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
import app from "server.js";
import databaseConnect from "./databaseConnect";

// Configure the enviroment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await databaseConnect();

    app.listen(PORT, () => {
      console.log(`Server is runnning on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
})();
