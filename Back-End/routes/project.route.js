import express from "express";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  submitBid,
  getProjectStats,
} from "../controllers/project.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Project CRUD operations
router.post("/create", isAuthenticated, multipleUpload, createProject);
router.get("/all", isAuthenticated, getAllProjects);
router.get("/my-projects", isAuthenticated, getMyProjects);
router.get("/stats", isAuthenticated, getProjectStats);
router.get("/:id", isAuthenticated, getProjectById);
router.put("/:id", isAuthenticated, updateProject);
router.delete("/:id", isAuthenticated, deleteProject);

// Bidding operations
router.post("/:id/bid", isAuthenticated, submitBid);

export default router;
