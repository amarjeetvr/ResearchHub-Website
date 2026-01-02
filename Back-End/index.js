import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import createIndexes from "./utils/createIndexes.js";
import cache from "./utils/cache.js";
import { generalLimiter, authLimiter } from "./middlewares/rateLimiter.js";
import { setupSecurity } from "./middleware/security.js";
import { initSocket } from "./utils/socket.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import notificationRoute from "./routes/notification.route.js";
import chatRoute from "./routes/chat.route.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

// 🔍 Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'SECRET_KEY', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file.');
  process.exit(1);
}

const app = express();
const server = createServer(app);

// 🛡️ Security middleware setup
setupSecurity(app);

// 🛠️ Dev-only header to fix some browser issues
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    next();
  });
}

// 🔧 Middleware setup with size limits
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// 🛡️ Apply general rate limiting to all requests
app.use(generalLimiter);

// 🔓 CORS Setup - Allow frontend URL from environment or default
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// 🏥 Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    service: "ResearchHub API",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// 📦 Route registrations
app.use("/api/v1/user", authLimiter, userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/chat", chatRoute);

// 🔐 Example protected route
app.get("/api/v1/protected-route", isAuthenticated, (req, res) => {
  res.json({ message: "You are authenticated!", userId: req.id });
});

// 🚀 Start server and DB
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

server.listen(PORT, async () => {
  await connectDB(); // Connect to MongoDB
  await createIndexes(); // Create database indexes
  await cache.connect(); // Connect to Redis
  
  // Initialize Socket.io
  initSocket(server);
  
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`⚡ Socket.io initialized`);
});
