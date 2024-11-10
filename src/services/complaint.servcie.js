import { getApiRequest, postApiRequest } from "./api.service"

const getComplaints = async () => {
  return getApiRequest('/complaints');
}

const getComplaintByCategory = async (category) => {
  return getApiRequest(`/complaints/category/${category}`);
}

const updateComplaint = async (id, data) => {
  return postApiRequest(`/complaints/${id}`, data);
}

const createComplaint = async (message) => {
  // return postApiRequest(`/new_complaint`, message);
  return postApiRequest(`http://localhost:3001/api/chat`, message);
}

export {
  getComplaints,
  getComplaintByCategory,
  createComplaint,
  updateComplaint
}
