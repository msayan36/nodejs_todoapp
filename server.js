import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import { connectDB } from "./db/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());

// Initial Route
app.get("/", (req, res) => {
  res.send("Nice Working");
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Error Middleware
app.use(errorMiddleware);

// Server
app.listen(port, () => {
  console.log(
    `Server is listening on port: ${port} in ${process.env.NODE_ENV} mode`
  );
});
