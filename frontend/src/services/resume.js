import api from "./api";

// Create a new resume
export async function createResume(data) {
  const res = await api.post("/resumes/create", data);
  return res.data;
}

// Get all resumes for logged-in user
export async function getUserResumes() {
  const res = await api.get("/resumes/my");
  return res.data;
}

// Get single resume by ID
export async function getResumeById(id) {
  const res = await api.get(`/resumes/${id}`);
  return res.data;
}

// Update resume
export async function updateResume(id, data) {
  const res = await api.put(`/resumes/${id}`, data);
  return res.data;
}

// Delete resume
export async function deleteResume(id) {
  const res = await api.delete(`/resumes/${id}`);
  return res.data;
}
