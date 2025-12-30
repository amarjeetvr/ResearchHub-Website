import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      message: "Unauthorized - Token missing", 
      success: false 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId; // Consistent with token signing
    next();
  } catch (err) {
    // Clear invalid token cookie
    res.clearCookie("token");
    
    // Provide helpful error message based on error type
    let message = "Invalid or expired token";
    if (err.name === "JsonWebTokenError" && err.message.includes("invalid signature")) {
      message = "Authentication failed. Please login again.";
    } else if (err.name === "TokenExpiredError") {
      message = "Your session has expired. Please login again.";
    }
    
    if (process.env.NODE_ENV === "development") {
      console.error("Auth middleware error:", err.name, "-", err.message);
    }
    
    return res.status(401).json({ 
      message,
      success: false,
      requiresLogin: true
    });
  }
};

export default isAuthenticated;
