import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { AdminProject } from "../models/adminProject.model.js";
import getDataUri from "../utils/dataUri.js";
import { cloudinary } from "../utils/cloudinary.js";
import { sendProposalAcceptedEmail, sendPaymentReleaseToAdmin, sendPaymentReleasedEmail } from "../utils/email.js";
import { generateProposalAcceptancePDF, generatePaymentReleasePDF } from "../utils/pdfGenerator.js";

// Create a new project (Client only)
export const createProject = async (req, res) => {
  try {
    const clientId = req.id; // From isAuthenticated middleware

    // Verify user is a client
    const user = await User.findById(clientId);
    if (!user || user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can post projects",
        success: false,
      });
    }

    const {
      title,
      introduction,
      detailedRequirements,
      skills,
      deliverables,
      deadline,
      budgetMin,
      budgetMax,
      category,
    } = req.body;

    if (
      !title ||
      !introduction ||
      !detailedRequirements ||
      !skills ||
      !deliverables ||
      !deadline ||
      !budgetMin ||
      !budgetMax
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }

    // Parse skills if it's a string
    let skillsArray = skills;
    if (typeof skills === "string") {
      try {
        skillsArray = JSON.parse(skills);
      } catch (e) {
        skillsArray = skills.split(",").map((s) => s.trim());
      }
    }

    // Handle file uploads if any
    let uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "auto",
        });
        uploadedFiles.push({
          filename: file.originalname,
          url: cloudResponse.secure_url,
        });
      }
    }

    const project = await Project.create({
      clientId,
      title,
      introduction,
      detailedRequirements,
      skills: skillsArray,
      deliverables,
      deadline: new Date(deadline),
      budgetMin: parseFloat(budgetMin),
      budgetMax: parseFloat(budgetMax),
      category: category || "General Research",
      files: uploadedFiles,
    });

    return res.status(201).json({
      message: "Project posted successfully",
      project,
      success: true,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({
      message: "Failed to create project",
      success: false,
    });
  }
};

// Get all projects for freelancers (open projects only)
export const getAllProjects = async (req, res) => {
  try {
    const { status, skills, budgetMin, budgetMax, search } = req.query;

    let filter = {};

    // Filter by status (default to open projects for freelancers)
    if (status) {
      filter.status = status;
    } else {
      filter.status = "open";
    }

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(",");
      filter.skills = { $in: skillsArray };
    }

    // Filter by budget
    if (budgetMin || budgetMax) {
      filter.budgetMax = {};
      if (budgetMin) filter.budgetMax.$gte = parseFloat(budgetMin);
      if (budgetMax) filter.budgetMax.$lte = parseFloat(budgetMax);
    }

    // Search by title or introduction
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { introduction: { $regex: search, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter)
      .populate("clientId", "fullname email profilePhoto")
      .populate("assignedFreelancer", "fullname email profilePhoto")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      projects,
      count: projects.length,
      success: true,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch projects",
      success: false,
    });
  }
};

// Get client's own projects
export const getMyProjects = async (req, res) => {
  try {
    const clientId = req.id;

    const user = await User.findById(clientId);
    if (!user || user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can view their projects",
        success: false,
      });
    }

    const { status } = req.query;
    let filter = { clientId };

    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate("assignedFreelancer", "fullname email profilePhoto")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      projects,
      count: projects.length,
      success: true,
    });
  } catch (error) {
    console.error("Get my projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch projects",
      success: false,
    });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const project = await Project.findById(id)
      .populate("clientId", "fullname email profilePhoto phoneNumber")
      .populate("assignedFreelancer", "fullname email profilePhoto")
      .populate("bids.freelancerId", "fullname email profilePhoto");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Check if user is authorized to view this project
    const user = await User.findById(userId);
    const isClient = project.clientId._id.toString() === userId;
    const isAssignedFreelancer =
      project.assignedFreelancer &&
      project.assignedFreelancer._id.toString() === userId;
    const canView =
      user.role === "freelancer" || isClient || isAssignedFreelancer;

    if (!canView) {
      return res.status(403).json({
        message: "You are not authorized to view this project",
        success: false,
      });
    }

    return res.status(200).json({
      project,
      success: true,
    });
  } catch (error) {
    console.error("Get project by ID error:", error);
    return res.status(500).json({
      message: "Failed to fetch project",
      success: false,
    });
  }
};

// Update project (Client only)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify ownership
    if (project.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only update your own projects",
        success: false,
      });
    }

    const allowedUpdates = [
      "title",
      "introduction",
      "detailedRequirements",
      "skills",
      "deliverables",
      "deadline",
      "budgetMin",
      "budgetMax",
      "status",
      "progress",
      "category",
    ];

    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    // Parse skills if provided as string
    if (updates.skills && typeof updates.skills === "string") {
      try {
        updates.skills = JSON.parse(updates.skills);
      } catch (e) {
        updates.skills = updates.skills.split(",").map((s) => s.trim());
      }
    }

    // Set completedAt when status changes to completed
    if (updates.status === "completed" && project.status !== "completed") {
      updates.completedAt = new Date();
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("clientId", "fullname email profilePhoto")
      .populate("assignedFreelancer", "fullname email profilePhoto");

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
      success: true,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      message: "Failed to update project",
      success: false,
    });
  }
};

// Delete project (Client only)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify ownership
    if (project.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only delete your own projects",
        success: false,
      });
    }

    // Don't allow deletion if project is in progress or completed
    if (project.status === "in-progress" || project.status === "completed") {
      return res.status(400).json({
        message: `Cannot delete ${project.status} projects`,
        success: false,
      });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      message: "Failed to delete project",
      success: false,
    });
  }
};

// Submit bid on project (Freelancer only)
export const submitBid = async (req, res) => {
  try {
    const { id } = req.params;
    const freelancerId = req.id;
    const { amount, proposal } = req.body;

    // Verify user is a freelancer
    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can submit bids",
        success: false,
      });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    if (project.status !== "open") {
      return res.status(400).json({
        message: "This project is no longer accepting bids",
        success: false,
      });
    }

    // Check if freelancer already submitted a bid
    const existingBid = project.bids.find(
      (bid) => bid.freelancerId.toString() === freelancerId
    );
    if (existingBid) {
      return res.status(400).json({
        message: "You have already submitted a bid for this project",
        success: false,
      });
    }

    if (!amount || !proposal) {
      return res.status(400).json({
        message: "Amount and proposal are required",
        success: false,
      });
    }

    project.bids.push({
      freelancerId,
      amount: parseFloat(amount),
      proposal,
    });

    await project.save();

    return res.status(201).json({
      message: "Bid submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Submit bid error:", error);
    return res.status(500).json({
      message: "Failed to submit bid",
      success: false,
    });
  }
};

// Accept a bid on a project (Client only)
export const acceptBid = async (req, res) => {
  try {
    const { id, bidId } = req.params;
    const clientId = req.id;

    // Verify user is a client
    const user = await User.findById(clientId);
    if (!user || user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can accept bids",
        success: false,
      });
    }

    const project = await Project.findById(id)
      .populate("clientId", "fullname email")
      .populate("bids.freelancerId", "fullname email bankAccount");
    
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify client owns this project
    if (project.clientId._id.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only accept bids on your own projects",
        success: false,
      });
    }

    // Find the bid
    const bid = project.bids.id(bidId);
    if (!bid) {
      return res.status(404).json({
        message: "Bid not found",
        success: false,
      });
    }

    // Update bid status to accepted
    bid.status = "accepted";
    
    // Assign freelancer to project
    project.assignedFreelancer = bid.freelancerId;
    project.status = "in-progress";

    // Reject all other bids
    project.bids.forEach((b) => {
      if (b._id.toString() !== bidId && b.status === "pending") {
        b.status = "rejected";
      }
    });

    await project.save();

    // Return project data with redirect to escrow
    return res.status(200).json({
      message: "Proposal accepted successfully. Please proceed to payment.",
      success: true,
      project,
      redirectTo: "/escrow",
      escrowData: {
        projectId: project._id,
        bidId: bid._id,
        projectTitle: project.title,
        freelancerName: bid.freelancerId.fullname,
        agreedAmount: bid.amount,
      },
    });
  } catch (error) {
    console.error("Accept bid error:", error);
    return res.status(500).json({
      message: "Failed to accept bid",
      success: false,
    });
  }
};

// Reject a bid on a project (Client only)
export const rejectBid = async (req, res) => {
  try {
    const { id, bidId } = req.params;
    const clientId = req.id;

    // Verify user is a client
    const user = await User.findById(clientId);
    if (!user || user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can reject bids",
        success: false,
      });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify client owns this project
    if (project.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only reject bids on your own projects",
        success: false,
      });
    }

    // Find the bid
    const bid = project.bids.id(bidId);
    if (!bid) {
      return res.status(404).json({
        message: "Bid not found",
        success: false,
      });
    }

    // Update bid status to rejected
    bid.status = "rejected";
    await project.save();

    return res.status(200).json({
      message: "Bid rejected successfully",
      success: true,
      project,
    });
  } catch (error) {
    console.error("Reject bid error:", error);
    return res.status(500).json({
      message: "Failed to reject bid",
      success: false,
    });
  }
};

// Get freelancer's proposals (Freelancer only)
export const getMyProposals = async (req, res) => {
  try {
    const freelancerId = req.id;

    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can view their proposals",
        success: false,
      });
    }

    // Find all projects where the freelancer has submitted a bid
    const projects = await Project.find({
      "bids.freelancerId": freelancerId,
    })
      .populate("clientId", "fullname email profilePhoto")
      .sort({ createdAt: -1 });

    // Extract only the freelancer's bids from each project
    const proposals = projects.map((project) => {
      const myBid = project.bids.find(
        (bid) => bid.freelancerId.toString() === freelancerId
      );
      return {
        _id: myBid._id,
        project: {
          _id: project._id,
          title: project.title,
          introduction: project.introduction,
          detailedRequirements: project.detailedRequirements,
          skills: project.skills,
          deliverables: project.deliverables,
          files: project.files,
          category: project.category,
          budgetMin: project.budgetMin,
          budgetMax: project.budgetMax,
          deadline: project.deadline,
          status: project.status,
          progress: project.progress,
          assignedFreelancer: project.assignedFreelancer,
          bids: project.bids,
          createdAt: project.createdAt,
          completedAt: project.completedAt,
          clientId: project.clientId,
        },
        amount: myBid.amount,
        proposal: myBid.proposal,
        submittedAt: myBid.submittedAt,
        status: myBid.status,
      };
    });

    return res.status(200).json({
      proposals,
      count: proposals.length,
      success: true,
    });
  } catch (error) {
    console.error("Get my proposals error:", error);
    return res.status(500).json({
      message: "Failed to fetch proposals",
      success: false,
    });
  }
};

// Get freelancer's active projects (Freelancer only)
export const getMyActiveProjects = async (req, res) => {
  try {
    const freelancerId = req.id;

    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can view their active projects",
        success: false,
      });
    }

    const projects = await Project.find({
      assignedFreelancer: freelancerId,
      status: "in-progress",
    })
      .populate("clientId", "fullname email profilePhoto")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      projects,
      count: projects.length,
      success: true,
    });
  } catch (error) {
    console.error("Get my active projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch active projects",
      success: false,
    });
  }
};

// Get freelancer's completed projects (Freelancer only)
export const getMyCompletedProjects = async (req, res) => {
  try {
    const freelancerId = req.id;

    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can view their completed projects",
        success: false,
      });
    }

    const projects = await Project.find({
      assignedFreelancer: freelancerId,
      status: "completed",
    })
      .populate("clientId", "fullname email profilePhoto")
      .sort({ completedAt: -1 });

    return res.status(200).json({
      projects,
      count: projects.length,
      success: true,
    });
  } catch (error) {
    console.error("Get my completed projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch completed projects",
      success: false,
    });
  }
};

// Get freelancer statistics for dashboard
export const getFreelancerStats = async (req, res) => {
  try {
    const freelancerId = req.id;

    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can view their statistics",
        success: false,
      });
    }

    // Count active projects
    const activeProjects = await Project.countDocuments({
      assignedFreelancer: freelancerId,
      status: "in-progress",
    });

    // Count pending proposals
    const projectsWithPendingBids = await Project.find({
      "bids.freelancerId": freelancerId,
      "bids.status": "pending",
    });
    const pendingProposals = projectsWithPendingBids.filter((project) =>
      project.bids.some(
        (bid) =>
          bid.freelancerId.toString() === freelancerId &&
          bid.status === "pending"
      )
    ).length;

    // Count completed projects
    const completedProjects = await Project.countDocuments({
      assignedFreelancer: freelancerId,
      status: "completed",
    });

    // Calculate total earned from accepted bids in completed projects
    const completed = await Project.find({
      assignedFreelancer: freelancerId,
      status: "completed",
    });

    let totalEarned = 0;
    completed.forEach((project) => {
      const acceptedBid = project.bids.find(
        (bid) =>
          bid.freelancerId.toString() === freelancerId &&
          bid.status === "accepted"
      );
      if (acceptedBid) {
        totalEarned += acceptedBid.amount;
      }
    });

    return res.status(200).json({
      stats: {
        activeProjects,
        pendingProposals,
        completedProjects,
        totalEarned,
      },
      success: true,
    });
  } catch (error) {
    console.error("Get freelancer stats error:", error);
    return res.status(500).json({
      message: "Failed to fetch statistics",
      success: false,
    });
  }
};

// Update project progress (Freelancer only)
export const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    const freelancerId = req.id;

    // Verify user is a freelancer
    const user = await User.findById(freelancerId);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can update progress",
        success: false,
      });
    }

    // Validate progress value
    if (progress === undefined || progress === null) {
      return res.status(400).json({
        message: "Progress value is required",
        success: false,
      });
    }

    const progressNum = parseInt(progress);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      return res.status(400).json({
        message: "Progress must be a number between 0 and 100",
        success: false,
      });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify freelancer is assigned to this project
    if (!project.assignedFreelancer || project.assignedFreelancer.toString() !== freelancerId) {
      return res.status(403).json({
        message: "You are not assigned to this project",
        success: false,
      });
    }

    // Verify project is in progress
    if (project.status !== "in-progress") {
      return res.status(400).json({
        message: "Can only update progress for in-progress projects",
        success: false,
      });
    }

    // Update progress
    project.progress = progressNum;

    // If progress is 100%, optionally mark as completed
    if (progressNum === 100) {
      project.status = "completed";
      project.completedAt = new Date();
    }

    await project.save();

    const updatedProject = await Project.findById(id)
      .populate("clientId", "fullname email profilePhoto")
      .populate("assignedFreelancer", "fullname email profilePhoto");

    return res.status(200).json({
      message: "Progress updated successfully",
      project: updatedProject,
      success: true,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    return res.status(500).json({
      message: "Failed to update progress",
      success: false,
    });
  }
};

// Get project statistics for client dashboard
export const getProjectStats = async (req, res) => {
  try {
    const clientId = req.id;

    const user = await User.findById(clientId);
    if (!user || user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can view project statistics",
        success: false,
      });
    }

    const activeProjects = await Project.countDocuments({
      clientId,
      status: { $in: ["open", "in-progress"] },
    });

    const inProgressProjects = await Project.countDocuments({
      clientId,
      status: "in-progress",
    });

    const completedProjects = await Project.countDocuments({
      clientId,
      status: "completed",
    });

    // Calculate total spent (accepted bid amount + platform commission)
    const completed = await Project.find({
      clientId,
      status: "completed",
    }).populate("bids");

    const totalSpent = completed.reduce((sum, project) => {
      // Find the accepted bid
      const acceptedBid = project.bids.find(bid => bid.status === "accepted");
      if (acceptedBid) {
        const bidAmount = acceptedBid.amount;
        const platformCommission = bidAmount * 0.10; // 10% commission
        return sum + bidAmount + platformCommission;
      }
      return sum;
    }, 0);

    return res.status(200).json({
      stats: {
        activeProjects,
        inProgressProjects,
        completedProjects,
        totalSpent,
      },
      success: true,
    });
  } catch (error) {
    console.error("Get project stats error:", error);
    return res.status(500).json({
      message: "Failed to fetch project statistics",
      success: false,
    });
  }
};

// Process escrow payment after client clicks "Pay Now"
export const processEscrowPayment = async (req, res) => {
  try {
    const { projectId, bidId } = req.body;
    const clientId = req.id;

    // Verify user is a client
    const client = await User.findById(clientId);
    if (!client || client.role !== "client") {
      return res.status(403).json({
        message: "Only clients can process payments",
        success: false,
      });
    }

    const project = await Project.findById(projectId)
      .populate("clientId", "fullname email")
      .populate("assignedFreelancer", "fullname email bankAccount");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify client owns this project
    if (project.clientId._id.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only process payments for your own projects",
        success: false,
      });
    }

    // Find the accepted bid
    const bid = project.bids.id(bidId);
    if (!bid || bid.status !== "accepted") {
      return res.status(404).json({
        message: "Accepted bid not found",
        success: false,
      });
    }

    const freelancer = project.assignedFreelancer;
    const bidAmount = bid.amount;
    const platformCommission = bidAmount * 0.1;
    const escrowAmount = bidAmount + platformCommission;

    // Create Admin Project Record
    const adminProject = await AdminProject.create({
      projectId: project._id,
      clientId: client._id,
      freelancerId: freelancer._id,
      clientName: client.fullname,
      freelancerName: freelancer.fullname,
      projectTitle: project.title,
      projectBudget: project.budgetMax,
      bidAmount: bidAmount,
      escrowAmount: escrowAmount,
      platformCommission: platformCommission,
      paymentStatus: "escrow_deposited",
      projectStatus: "in-progress",
    });

    console.log("✅ Admin project record created:", adminProject._id);

    // Generate PDF
    const pdfPath = await generateProposalAcceptancePDF({
      clientName: client.fullname,
      freelancerName: freelancer.fullname,
      projectTitle: project.title,
      bidAmount: bidAmount,
      projectDescription: project.introduction,
    });

    // Send email to freelancer with PDF attachment
    await sendProposalAcceptedEmail({
      to: freelancer.email,
      clientName: client.fullname,
      freelancerName: freelancer.fullname,
      projectTitle: project.title,
      bidAmount: bidAmount,
      pdfPath: pdfPath,
    });

    // Update admin project record to mark email as sent
    adminProject.emailNotifications.proposalAcceptedSent = true;
    await adminProject.save();

    return res.status(200).json({
      message: "Payment processed successfully. Freelancer has been notified.",
      success: true,
      adminProjectId: adminProject._id,
    });
  } catch (error) {
    console.error("Process escrow payment error:", error);
    return res.status(500).json({
      message: "Failed to process payment",
      error: error.message,
      success: false,
    });
  }
};

// Client approves completed project and triggers payment release
export const approveProjectCompletion = async (req, res) => {
  try {
    const { projectId } = req.params;
    const clientId = req.id;

    // Verify user is a client
    const client = await User.findById(clientId);
    if (!client || client.role !== "client") {
      return res.status(403).json({
        message: "Only clients can approve project completion",
        success: false,
      });
    }

    const project = await Project.findById(projectId)
      .populate("clientId", "fullname email")
      .populate("assignedFreelancer", "fullname email bankAccount");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Verify client owns this project
    if (project.clientId._id.toString() !== clientId) {
      return res.status(403).json({
        message: "You can only approve your own projects",
        success: false,
      });
    }

    // Verify project is completed
    if (project.status !== "completed" || project.progress !== 100) {
      return res.status(400).json({
        message: "Project must be 100% completed before approval",
        success: false,
      });
    }

    // Find the admin project record
    const adminProject = await AdminProject.findOne({
      projectId: project._id,
    });

    if (!adminProject) {
      return res.status(404).json({
        message: "Admin project record not found",
        success: false,
      });
    }

    // Update admin project with client approval
    adminProject.clientApproval.approved = true;
    adminProject.clientApproval.approvedAt = new Date();
    adminProject.projectStatus = "approved";
    await adminProject.save();

    // Mark project as approved to prevent popup re-showing
    project.clientApproved = true;
    await project.save();

    // Send email to admin for payment release
    await sendPaymentReleaseToAdmin({
      clientName: client.fullname,
      freelancerName: project.assignedFreelancer.fullname,
      projectTitle: project.title,
      bidAmount: adminProject.bidAmount,
      freelancerAccount: project.assignedFreelancer.bankAccount,
    });

    // Update admin project to mark email as sent
    adminProject.emailNotifications.paymentReleaseSent = true;
    await adminProject.save();

    return res.status(200).json({
      message: "Project approved. Payment release notification sent to admin.",
      success: true,
      freelancerAccount: project.assignedFreelancer.bankAccount,
    });
  } catch (error) {
    console.error("Approve project completion error:", error);
    return res.status(500).json({
      message: "Failed to approve project",
      error: error.message,
      success: false,
    });
  }
};

// Get all admin projects (Admin only)
export const getAdminProjects = async (req, res) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "Authentication required",
        success: false,
      });
    }

    const userId = req.id;
    
    // Check if user is admin (admin login sets userId to "admin")
    if (userId === "admin") {
      // Admin can see all projects
      const adminProjects = await AdminProject.find()
        .populate("clientId", "fullname email profilePhoto")
        .populate("freelancerId", "fullname email profilePhoto bankAccount")
        .populate("projectId", "title status progress")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        adminProjects,
        count: adminProjects.length,
        success: true,
      });
    }

    // For regular users, verify they exist
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Regular authenticated users can also see admin projects (for now)
    const adminProjects = await AdminProject.find()
      .populate("clientId", "fullname email profilePhoto")
      .populate("freelancerId", "fullname email profilePhoto bankAccount")
      .populate("projectId", "title status progress")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      adminProjects,
      count: adminProjects.length,
      success: true,
    });
  } catch (error) {
    console.error("Get admin projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch admin projects",
      error: error.message,
      success: false,
    });
  }
};

// Release payment to freelancer (Admin only)
export const releasePayment = async (req, res) => {
  try {
    const { adminProjectId } = req.params;
    const userId = req.id;

    // Verify user is admin
    if (userId !== "admin") {
      return res.status(403).json({
        message: "Only admin can release payments",
        success: false,
      });
    }

    const adminProject = await AdminProject.findById(adminProjectId)
      .populate("clientId", "fullname email")
      .populate("freelancerId", "fullname email bankAccount")
      .populate("projectId", "title status progress");

    if (!adminProject) {
      return res.status(404).json({
        message: "Admin project record not found",
        success: false,
      });
    }

    // Check if payment already released
    if (adminProject.paymentStatus === "released") {
      return res.status(400).json({
        message: "Payment has already been released",
        success: false,
      });
    }

    // Check if client has approved
    if (!adminProject.clientApproval.approved) {
      return res.status(400).json({
        message: "Client must approve the project before payment release",
        success: false,
      });
    }

    // Generate PDF for payment release
    const { generatePaymentReleasePDF } = await import("../utils/pdfGenerator.js");
    const pdfPath = await generatePaymentReleasePDF({
      freelancerName: adminProject.freelancerId.fullname,
      clientName: adminProject.clientId.fullname,
      projectTitle: adminProject.projectId.title,
      amount: adminProject.bidAmount,
      bankAccount: adminProject.freelancerId.bankAccount,
      transactionId: `TXN${Date.now()}`,
    });

    // Send email to freelancer with PDF
    const { sendPaymentReleasedEmail } = await import("../utils/email.js");
    await sendPaymentReleasedEmail({
      to: adminProject.freelancerId.email,
      freelancerName: adminProject.freelancerId.fullname,
      clientName: adminProject.clientId.fullname,
      projectTitle: adminProject.projectId.title,
      amount: adminProject.bidAmount,
      pdfPath: pdfPath,
      bankAccount: adminProject.freelancerId.bankAccount,
    });

    // Update admin project status
    adminProject.paymentStatus = "released";
    adminProject.paymentReleasedAt = new Date();
    adminProject.emailNotifications.paymentCompletedSent = true;
    await adminProject.save();

    // Update main project status
    const project = await Project.findById(adminProject.projectId._id);
    if (project) {
      project.paymentReleased = true;
      await project.save();
    }

    return res.status(200).json({
      message: "Payment released successfully. Email sent to freelancer.",
      success: true,
      adminProject,
    });
  } catch (error) {
    console.error("Release payment error:", error);
    return res.status(500).json({
      message: "Failed to release payment",
      error: error.message,
      success: false,
    });
  }
};
