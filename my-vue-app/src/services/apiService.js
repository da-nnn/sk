// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL || 'http://localhost:3000'
});

// Example method for fetching scholarships
export const fetchScholarships = () => api.get('/scholarships');

// Example method for fetching a specific scholarship by ID
export const fetchScholarshipById = id => api.get(`/scholarships/${id}`);

// Response interceptor for handling errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default api;
