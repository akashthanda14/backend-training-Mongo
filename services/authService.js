import jwt from "jsonwebtoken";
import User from "../models/User.js";
import * as emailService from "./emailService.js";
import * as otpService from "./otpService.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signup = async (userData) => {
  const { username, email, password } = userData;
  
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }]
  });
  
  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }
  
  // Create new user (not verified yet)
  const user = new User({ username, email, password, isVerified: false });
  await user.save();
  
  // Generate and send OTP
  const otp = otpService.generateOTP();
  const otpExpires = otpService.generateOTPExpiry();
  
  // Save OTP to user
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();
  
  // Send OTP email
  await emailService.sendOTPEmail(email, otp);
  
  return {
    message: "User created successfully. Please verify your email with the OTP sent.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: false
    }
  };
};

export const signin = async (credentials) => {
  const { email, password } = credentials;
  
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // Check password
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }
  
  // Check if user is verified
  if (!user.isVerified) {
    throw new Error("Please verify your email first. Check your email for OTP.");
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified
    }
  };
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const sendOTP = async (email) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate OTP
  const otp = otpService.generateOTP();
  const otpExpires = otpService.generateOTPExpiry();

  // Save OTP to user
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // Send OTP email
  await emailService.sendOTPEmail(email, otp);

  return { message: "OTP sent successfully" };
};

export const verifyOTP = async (email, otp) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Verify OTP
  const verification = otpService.verifyOTP(otp, user.otp, user.otpExpires);
  if (!verification.valid) {
    throw new Error(verification.reason);
  }

  // Clear OTP and mark as verified
  user.otp = null;
  user.otpExpires = null;
  user.isVerified = true;
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified
    }
  };
};

export default { signup, signin, verifyToken, sendOTP, verifyOTP };
