import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Set the Authorization header using the token from localStorage
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
instance.defaults.withCredentials = true;

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      'http://localhost:8080/api/refresh-token',
      {},
      { withCredentials: true }
    );
    const newAccessToken = res.data?.accessToken;

    // Update the new Access Token in localStorage
    localStorage.setItem('accessToken', newAccessToken);

    // Update the Authorization header for the axios instance
    instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (err) {
    console.error('Error refreshing access token', err);
    // Redirect to login if the refresh token is invalid
    window.location.href = '/login';
  }
};

// Add a response interceptor to automatically refresh the token if it expires
instance.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response data
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 403 (forbidden) and retry hasn't already been attempted
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried
      await refreshAccessToken();

      // Retry the original request with the new token
      originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
      return instance(originalRequest);
    }

    // Handle other error statuses
    const status = (error.response && error.response.status) || 500;
    switch (status) {
      case 401: {
        toast.error('Unauthorized user. Please log in...');
        break;
      }
      case 403: {
        toast.error('You do not have permission to access this resource.');
        break;
      }
      // default: {
      //   toast.error('An error occurred. Please try again.');
      //   break;
      // }
    }

    // Reject the promise with the error
    return Promise.reject(error);
  }
);

export default instance;
