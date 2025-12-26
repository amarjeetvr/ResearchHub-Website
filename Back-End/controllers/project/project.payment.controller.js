import { Project } from "../../models/project.model.js";
import { User } from "../../models/user.model.js";
import { AdminProject } from "../../models/adminProject.model.js";
import { sendProposalAcceptedEmail, sendPaymentReleaseToAdmin, sendPaymentReleasedEmail } from "../../utils/email.js";
import { generateProposalAcceptancePDF, generatePaymentReleasePDF } from "../../utils/pdfGenerator.js";

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
    const pdfPath = await generatePaymentReleasePDF({
      freelancerName: adminProject.freelancerId.fullname,
      clientName: adminProject.clientId.fullname,
      projectTitle: adminProject.projectId.title,
      amount: adminProject.bidAmount,
      bankAccount: adminProject.freelancerId.bankAccount,
      transactionId: `TXN${Date.now()}`,
    });

    // Send email to freelancer with PDF
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
