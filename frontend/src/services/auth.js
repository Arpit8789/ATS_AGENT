import api from "./api";

// Register user (sends OTP)
export async function registerUser(data) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

// Verify OTP after registration
export async function verifyRegistrationOTP(email, otp) {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
}

// Resend OTP
export async function resendOTP(email) {
  const res = await api.post("/auth/resend-otp", { email });
  return res.data;
}

// Login user - Updated to store user data and return user object
export async function loginUser({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user with role
  }
  
  return res.data.user; // Return user object with role
}

// Forgot password (send OTP)
export async function forgotPassword(email) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

// Verify reset OTP
export async function verifyResetOTP(email, otp) {
  const res = await api.post("/auth/verify-reset-otp", { email, otp });
  return res.data;
}

// Reset password
export async function resetPassword(email, otp, newPassword) {
  const res = await api.post("/auth/reset-password", { email, otp, newPassword });
  return res.data;
}

// Get current user from localStorage
export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is admin
export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === "admin";
}

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
