import { useAuth } from '@clerk/nextjs'; // Use '@clerk/clerk-react' if on standard React
import axios from 'axios';

export function useApi() {
  const { getToken } = useAuth();

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:6030/api';

  const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    get: async (endpoint, config = {}) => {
      const response = await apiInstance.get(endpoint, config);
      return response.data;
    },
    post: async (endpoint, data = {}, config = {}) => {
      const response = await apiInstance.post(endpoint, data, config);
      return response.data;
    },
    put: async (endpoint, data = {}, config = {}) => {
      const response = await apiInstance.put(endpoint, data, config);
      return response.data;
    },
    delete: async (endpoint, config = {}) => {
      const response = await apiInstance.delete(endpoint, config);
      return response.data;
    },
  };
}