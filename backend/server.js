import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Environment variables loaded:", process.env.DB_PASSWORD);

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@thechocbyj-dev.etc1o88.mongodb.net/?retryWrites=true&w=majority&appName=TheChocByJ-Dev`;

console.log("Datebase URI:", dbURI);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.error);
