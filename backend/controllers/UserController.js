import User from "../models/UserModel.js";
import jsonwebtoken from "jsonwebtoken";

// Signup function to handle user registration
export const signup = async (req, res, next) => {
  // Extracting user details from the request body
  const { firstName, lastName, email, password } = req.body;
  try {
    // Create a new user in the database using the provided details
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    // Respond with a success status and the newly created user data
    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    // If user not found, return a error message
    if (!user) {
      return res.status(401).json({ message: "Invaild email or password" });
    }
    // Check if the entered password matches the stored password
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );
    // If password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // If authentication is successful, create a JWT token
    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    // Send a success response with the token
    res.status(200).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};
