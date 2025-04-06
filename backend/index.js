import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";

// Configureation for enviroment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@thechocbyj-dev.etc1o88.mongodb.net/?retryWrites=true&w=majority&appName=TheChocByJ-Dev`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(bodyParser.json());

let productsCollection;

(async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("You successfully connected to MongoDB.");

    const database = client.db("thechocbyj");
    productsCollection = database.collection("products");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Ping successful: MongoDB is responding.");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exsit(1);
  }
})();
