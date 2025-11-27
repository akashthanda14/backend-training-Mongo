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
      message: result.message,
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

// Send OTP to email
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        message: "Please provide email"
      });
    }

    const result = await authService.sendOTP(email);

    res.status(200).json({
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to send OTP",
      error: error.message
    });
  }
};

// Verify OTP and complete authentication
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        message: "Please provide email and OTP"
      });
    }

    const result = await authService.verifyOTP(email, otp);

    res.status(200).json({
      message: "OTP verified successfully",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(400).json({
      message: "OTP verification failed",
      error: error.message
    });
  }
};
