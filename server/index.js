import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://xmum-lab.netlify.app"],
    credentials: true,
  })
);

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Connected to DB."))
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  connect();
  console.log(`Server running at PORT: ${PORT}`);
});
