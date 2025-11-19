import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

const app = express();

// 🛠️ Dev-only header to fix some browser issues (optional)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});

// 🌐 Middleware to log incoming headers (optional for debugging)
app.use((req, res, next) => {
  console.log("Incoming headers:", req.headers);
  next();
});

// 🔧 Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔓 CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// 📦 Route registrations
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);

// 🔐 Example protected route
app.get("/api/v1/protected-route", isAuthenticated, (req, res) => {
  res.json({ message: "You are authenticated!", userId: req.id });
});

// 🚀 Start server and DB
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(` Server running at ${PORT}`);
});
