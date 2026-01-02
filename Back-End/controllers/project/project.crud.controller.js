import { Project } from "../../models/project.model.js";
import { User } from "../../models/user.model.js";
import getDataUri from "../../utils/dataUri.js";
import { cloudinary } from "../../utils/cloudinary.js";
import cache from "../../utils/cache.js";
import mongoose from "mongoose";

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

// Get all projects for Researchers (open projects only)
export const getAllProjects = async (req, res) => {
  try {
    const cacheKey = `projects_${JSON.stringify(req.query)}`;
    const cached = await cache.get(cacheKey);
    if (cached) return res.status(200).json(cached);

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database connection unavailable",
        success: false,
      });
    }

    const { status, skills, budgetMin, budgetMax, search } = req.query;

    let filter = {};

    // Filter by status (default to open projects for Researchers)
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

    const result = {
      projects,
      count: projects.length,
      success: true,
    };

    await cache.set(cacheKey, result, 300);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message,
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
