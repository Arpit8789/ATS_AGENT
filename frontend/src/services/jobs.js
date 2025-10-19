import api from "./api";

// Get all jobs
export async function getAllJobs(params = {}) {
  const res = await api.get("/jobs/all", { params });
  return res.data;
}

// Get single job by ID
export async function getJobById(id) {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
}

// Search jobs with filters
export async function searchJobs(filters = {}) {
  const res = await api.get("/jobs/search", { params: filters });
  return res.data;
}

// Create a new job (admin only)
export async function createJob(data) {
  const res = await api.post("/jobs/create", data);
  return res.data;
}

// Update job (admin only)
export async function updateJob(id, data) {
  const res = await api.put(`/jobs/${id}`, data);
  return res.data;
}

// Delete job (admin only)
export async function deleteJob(id) {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
}

// Apply to job (user)
export async function applyToJob(id) {
  const res = await api.post(`/jobs/${id}/apply`);
  return res.data;
}

// Bulk create jobs (admin only)
export async function bulkCreateJobs(jobs) {
  const res = await api.post("/jobs/bulk-create", { jobs });
  return res.data;
}
