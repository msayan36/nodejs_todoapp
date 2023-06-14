import express from "express";
import {
  newTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/myTasks", isAuthenticated, getTasks);

router
  .route("/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
