import { Project } from "../../models/project.model.js";
import { User } from "../../models/user.model.js";

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
        message: "Only Researchers can submit bids",
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
