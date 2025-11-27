import crypto from "crypto";

export const generateOTP = () => {
  // Generate a 6-digit OTP
  return crypto.randomInt(100000, 999999).toString();
};

export const generateOTPExpiry = () => {
  // OTP expires in 10 minutes
  return new Date(Date.now() + 10 * 60 * 1000);
};

export const verifyOTP = (userOTP, storedOTP, expiryTime) => {
  // Check if OTP matches and hasn't expired
  if (!storedOTP || !expiryTime) {
    return { valid: false, reason: 'No OTP found' };
  }

  if (new Date() > new Date(expiryTime)) {
    return { valid: false, reason: 'OTP has expired' };
  }

  if (userOTP !== storedOTP) {
    return { valid: false, reason: 'Invalid OTP' };
  }

  return { valid: true };
};

export default { generateOTP, generateOTPExpiry, verifyOTP };
