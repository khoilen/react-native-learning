import axios from 'axios';

import { useAuthStore } from '@/features/authentication/stores/authentication-store';

import Config from '@/config/config';
export const http = axios.create({
  baseURL: Config.API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => response,
  async error => {
    const logout = useAuthStore.getState().logout;
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Unauthorized! Logging out...');
      logout();
    }
    return Promise.reject(error);
  },
);
