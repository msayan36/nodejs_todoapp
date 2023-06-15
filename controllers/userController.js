import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { User } from "../models/user.js";
import asyncHandler from "express-async-handler";

// Get all the Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  console.log(req.query);

  res.status(200).json({
    success: true,
    users,
  });
});

// Create a User
export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    next(new Error("User Already Exists"));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(user, res, "Registered Successfully", 201);
});

// Login a User
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400);
    next(new Error("Invalid Email or Password"));
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    next(new Error("Invalid Email or Password"));
    return;
  }

  sendCookie(user, res, `Welcome Back ${user.name}`, 200);
});

// Special Test Case
export const specialCase = (req, res) => {
  res.json({
    success: true,
    message: "Just Joking",
  });
};

// Get a single User.
export const getSingleUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Logout User.
export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: "Logged Out Successfully",
    });
};

// Update a single User.
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    message: "Updated",
  });
});

// Delete a single User.
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Deleted",
  });
});
