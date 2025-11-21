import { verifyToken } from "../services/authService.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header provided" });
    }
    
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = verifyToken(token);
    req.user = decoded; // Add user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Invalid or expired token",
      error: error.message 
    });
  }
};

export default authenticate;
