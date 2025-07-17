import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// * interceptors
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log("🚀 ~ tesloApi.interceptors.request.use ~ token:", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export { tesloApi };
