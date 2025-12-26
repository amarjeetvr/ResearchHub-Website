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
  getMyProposals,
  getMyActiveProjects,
  getMyCompletedProjects,
  getFreelancerStats,
  updateProgress,
  processEscrowPayment,
  approveProjectCompletion,
  getAdminProjects,
  releasePayment,
} from "../controllers/project/project.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Project CRUD operations
router.post("/create", isAuthenticated, multipleUpload, createProject);
router.get("/all", getAllProjects); // Public - no authentication required
router.get("/my-projects", isAuthenticated, getMyProjects);
router.get("/stats", isAuthenticated, getProjectStats);
router.get("/my-proposals", isAuthenticated, getMyProposals);
router.get("/my-active-projects", isAuthenticated, getMyActiveProjects);
router.get("/my-completed-projects", isAuthenticated, getMyCompletedProjects);
router.get("/freelancer-stats", isAuthenticated, getFreelancerStats);
router.get("/admin-projects", isAuthenticated, getAdminProjects);
router.get("/:id", isAuthenticated, getProjectById); // Protected - requires login
router.put("/:id", isAuthenticated, updateProject);
router.patch("/:id/update-progress", isAuthenticated, updateProgress);
router.delete("/:id", isAuthenticated, deleteProject);

// Bidding operations
router.post("/:id/bid", isAuthenticated, submitBid);
router.post("/:id/bid/:bidId/accept", isAuthenticated, acceptBid);
router.post("/:id/bid/:bidId/reject", isAuthenticated, rejectBid);

// Escrow and payment operations
router.post("/escrow/process-payment", isAuthenticated, processEscrowPayment);
router.post("/:projectId/approve-completion", isAuthenticated, approveProjectCompletion);
router.post("/release-payment/:adminProjectId", isAuthenticated, releasePayment);

export default router;
