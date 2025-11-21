import * as authService from "../services/authService.js";

// Sign up new user
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password"
      });
    }
    
    const result = await authService.signup({ username, email, password });
    
    res.status(201).json({
      message: "User created successfully",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message
    });
  }
};

// Sign in existing user
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }
    
    const result = await authService.signin({ email, password });
    
    res.status(200).json({
      message: "Signed in successfully",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      error: error.message
    });
  }
};
