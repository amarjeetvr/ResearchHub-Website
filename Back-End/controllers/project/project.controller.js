// Re-export all controller functions from their respective modules
// This file serves as the main entry point for all project-related controllers

// CRUD operations
export {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.crud.controller.js";

// Bidding operations
export {
  submitBid,
  acceptBid,
  rejectBid,
} from "./project.bidding.controller.js";

// Freelancer-specific operations
export {
  getMyProposals,
  getMyActiveProjects,
  getMyCompletedProjects,
  getFreelancerStats,
  updateProgress,
} from "./project.freelancer.controller.js";

// Client statistics
export {
  getProjectStats,
} from "./project.stats.controller.js";

// Payment and escrow operations
export {
  processEscrowPayment,
  approveProjectCompletion,
  getAdminProjects,
  releasePayment,
} from "./project.payment.controller.js";
