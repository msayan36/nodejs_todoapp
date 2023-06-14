import express from "express";
import {
  getAllUsers,
  createUser,
  specialCase,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/special", specialCase);

router
  .route("/me")
  .get(isAuthenticated, getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
