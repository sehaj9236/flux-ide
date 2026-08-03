import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  try {
    // Safely check if window.Clerk and session exist before calling getToken
    const session = window?.Clerk?.session;
    if (session && typeof session.getToken === 'function') {
      const token = await session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error("Failed to get auth token:", error);
  }
  return config;
});

export default apiClient;