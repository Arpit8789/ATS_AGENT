import api from "./api";

// Record a payment
export async function createPayment(data) {
  const res = await api.post("/payments/create", data);
  return res.data;
}
