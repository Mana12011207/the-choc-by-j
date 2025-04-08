import Product from "../models/ProductModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
};

// Upate a product by id
export const updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateProduct)
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });
    res.status(200).json({ status: "success", data: updateProduct });
  } catch (error) {
    next(error);
  }
};

// Delete a product by id
export const deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct)
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    next(error);
  }
};
