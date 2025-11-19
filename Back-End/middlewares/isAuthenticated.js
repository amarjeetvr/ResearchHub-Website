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
    console.error("Auth middleware error:", err);
    return res.status(401).json({ 
      message: "Invalid or expired token", 
      success: false 
    });
  }
};

export default isAuthenticated;
