import Task from "../models/task.js";
import asyncHandler from "express-async-handler";

// Create new task
export const newTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({ title, description, user: req.user });

  res.status(201).json({
    success: true,
    message: "Task Created Successfully",
  });
});

// Get All Tasks
export const getTasks = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const tasks = await Task.find({ user: _id });

  res.status(200).json({
    success: true,
    tasks,
  });
});

// Update Task
export const updateTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    next(new Error("Task not Found"));
    return;
  }

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "task Updated Successfully",
  });
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    res.status(404);
    next(new Error("Task not Found"));
    return;
  }

  res.status(200).json({
    success: true,
    message: "task Deleted Successfully",
  });
});
