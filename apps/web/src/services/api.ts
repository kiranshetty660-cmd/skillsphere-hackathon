import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export const api = axios.create({
  baseURL: '/api', // Proxied via Vite
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to inject the JWT token
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
