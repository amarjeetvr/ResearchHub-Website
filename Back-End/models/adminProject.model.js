import mongoose from "mongoose";

const adminProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    freelancerName: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectBudget: {
      type: Number,
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    escrowAmount: {
      type: Number,
      required: true,
    },
    platformCommission: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "escrow_deposited", "released", "refunded"],
      default: "pending",
    },
    projectStatus: {
      type: String,
      enum: ["in-progress", "completed", "approved", "disputed"],
      default: "in-progress",
    },
    clientApproval: {
      approved: {
        type: Boolean,
        default: false,
      },
      approvedAt: {
        type: Date,
      },
    },
    emailNotifications: {
      proposalAcceptedSent: {
        type: Boolean,
        default: false,
      },
      paymentReleaseSent: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export const AdminProject = mongoose.model("AdminProject", adminProjectSchema);
