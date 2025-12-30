import { Project } from "../../models/project.model.js";
import { User } from "../../models/user.model.js";

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
