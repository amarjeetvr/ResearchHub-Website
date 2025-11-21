import express from "express";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  submitBid,
  acceptBid,
  rejectBid,
  getProjectStats,
} from "../controllers/project.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Project CRUD operations
router.post("/create", isAuthenticated, multipleUpload, createProject);
router.get("/all", getAllProjects); // Public - no authentication required
router.get("/my-projects", isAuthenticated, getMyProjects);
router.get("/stats", isAuthenticated, getProjectStats);
router.get("/:id", isAuthenticated, getProjectById); // Protected - requires login
router.put("/:id", isAuthenticated, updateProject);
router.delete("/:id", isAuthenticated, deleteProject);

// Bidding operations
router.post("/:id/bid", isAuthenticated, submitBid);
router.post("/:id/bid/:bidId/accept", isAuthenticated, acceptBid);
router.post("/:id/bid/:bidId/reject", isAuthenticated, rejectBid);

export default router;
