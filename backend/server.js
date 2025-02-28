import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect();

app.length("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port{PORT}`);
});
