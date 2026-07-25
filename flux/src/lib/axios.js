import axios from 'axios';
import { useAuth } from '@clerk/nextjs'; // Or your framework's hook

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// This interceptor runs before every request
apiClient.interceptors.request.use(async (config) => {
  try {
    // This hook gets the latest valid token
    const token = await window.Clerk.session.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to get auth token:", error);
  }
  return config;
});

export default apiClient;