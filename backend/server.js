import express from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";

//Define a server instance
const app = express();

// Middleware to enable request.body
app.use(express.json());

// Middleware to parse the URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set CORS options to allow requests only from the client host specfied in the environment configuration.
const corsOptions = {
  origin: process.env.CLIENT_HOST || "http:localhost:3000",
  optionSuccessStatus: 200,
};

// Enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orsers", orderRoutes);

export default app;
