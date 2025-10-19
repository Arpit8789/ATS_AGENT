import api from "./api";

// Get current logged in user
export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}

// Admin analytics stats
export async function getAdminStats() {
  const res = await api.get("/admin/stats");
  return res.data;
}
