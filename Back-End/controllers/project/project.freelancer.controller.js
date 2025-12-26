import { Project } from "../../models/project.model.js";
import { User } from "../../models/user.model.js";

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
      clientApproved: true,
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

    // Count completed projects (approved by client)
    const completedProjects = await Project.countDocuments({
      assignedFreelancer: freelancerId,
      status: "completed",
      clientApproved: true,
    });

    // Calculate total earned from completed AND payment-released projects
    const completedWithPayment = await Project.find({
      assignedFreelancer: freelancerId,
      status: "completed",
      clientApproved: true,
      paymentReleased: true,
    });

    let totalEarned = 0;
    completedWithPayment.forEach((project) => {
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
