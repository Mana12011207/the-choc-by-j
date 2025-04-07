import mongoose from "mongoose";
import util from "util";

const databaseConnect = async () => {
  try {
    const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

    // MongoDB connection
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");

    if (
      process.env.NODE_ENV == "development" && //Check if the app is in development mode
      process.env.MONGOOSE_DEBUG === "true" // Check if Mongoose debugging is enabled in the environment variables
    ) {
      mongoose.set("debug", (collectionName, method, query, doc) => {
        //Enable Mongoose debug mode to log details of MongoDB operations
        console.log(
          `${collectionName}.${method}`, // Log the collection name and the method used
          util.inspect(query, false, 20), // Log the query object with a detailed inspection
          doc // Log addtional document details
        );
      });
    }
  } catch (error) {
    console.error("Failed to connect MongoDB:.", error);
    // Terminate the process with a non-zero status to indicate failure
    process.exit(1);
  }
};

export default databaseConnect;
