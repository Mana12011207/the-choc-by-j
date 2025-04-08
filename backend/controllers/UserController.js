import User from "../models/UserModel.js";

// Sign up for a new user
export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    next(error);
  }
};
