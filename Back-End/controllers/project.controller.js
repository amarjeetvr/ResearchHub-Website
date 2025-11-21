import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/dataUri.js";
import { cloudinary } from "../utils/cloudinary.js";

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

    return res.status(200).json({
      message: "Proposal accepted successfully. Notification sent to freelancer.",
      success: true,
      project,
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
          category: project.category,
          budgetMin: project.budgetMin,
          budgetMax: project.budgetMax,
          deadline: project.deadline,
          status: project.status,
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

    // Calculate total spent
    const completed = await Project.find({
      clientId,
      status: "completed",
    }).select("budgetMax");

    const totalSpent = completed.reduce(
      (sum, project) => sum + project.budgetMax,
      0
    );

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
