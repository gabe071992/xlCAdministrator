import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://xlcapi.replit.app',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Authentication required. Please log in again.');
          // Handle logout or token refresh here
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 429:
          toast.error('Rate limit exceeded. Please try again later.');
          break;
        default:
          toast.error(error.response.data.message || 'An error occurred');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }
    return Promise.reject(error);
  }
);

export default api;