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

const createComplaint = async (message) => {
  // return postApiRequest(`/new_complaint`, data);
  return postApiRequest(`http://localhost:3001/api/chat`, message);

}

export {
  getComplaints,
  getCompliant,
  getComplaintByCategory,
  createComplaint, 
  updateComplaint
}
