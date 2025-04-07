import mongoose from "mongoose";
import util from "util";

const databaseConnect = async () => {
  try {
    // Build MongoDB URI using environment variables
    const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

    // Connect to MongoDB using Mongoose
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true, //Ensure compatibility with MongoDB URI string
      useUnifiedTopology: true, // Use the new connection management engine
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
    process.exit(1); // Terminate the process in case of a fatal error
  }
};

export default databaseConnect;
