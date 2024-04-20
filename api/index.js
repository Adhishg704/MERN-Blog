import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();
const PORT = 3000;

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

  const __dirname = path.resolve();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/post", postRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});