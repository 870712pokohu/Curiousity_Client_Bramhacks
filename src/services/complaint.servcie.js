import { getApiRequest, postApiRequest } from "./api.service"

const getComplaints = async () => {
  return getApiRequest('/complaints');
}

const getCompliant = async (id) => {
  return getApiRequest(`/complaints/${id}`);
}

const getComplaintByCategory = async (category) => {
  return getApiRequest(`/complaints/${category}`);
}

const updateComplaint = async (id, data) => {
  return postApiRequest(`/complaints/${id}`, data);
}

export {
  getComplaints,
  getCompliant,
  getComplaintByCategory,
  updateComplaint
}
