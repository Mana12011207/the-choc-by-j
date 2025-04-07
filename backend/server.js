import express from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";
import helmet from "helmet";

//Define a server instance
const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Middleware to enable request.body
app.use(express.json());

// Middleware to parse the URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set CORS option to allow requests only from the client host specfied in the environment configuration.
const corsOptions = {
  origin: process.env.CLIENT_HOST || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// Enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orsers", orderRoutes);

// Middleware to handle 404 Not Found error
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Middleware for global error handler
app.use(globalErrorHandling);

export default app;
