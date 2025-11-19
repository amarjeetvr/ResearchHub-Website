import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    detailedRequirements: {
      type: String,
      required: true,
    },
    skills: [{
      type: String,
      required: true,
    }],
    deliverables: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    budgetMin: {
      type: Number,
      required: true,
    },
    budgetMax: {
      type: Number,
      required: true,
    },
    files: [{
      filename: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },
    category: {
      type: String,
      default: "General Research",
    },
    assignedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bids: [{
      freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: Number,
      proposal: String,
      submittedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    }],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
