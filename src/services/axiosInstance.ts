import axios from 'axios';
import { API_CONFIG, APP_COPY, STORAGE_KEYS } from '../constants/app.constants';
import { showErrorToast } from './toast.service';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.accessToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    showErrorToast(APP_COPY.serverErrorMessage);
    return Promise.reject(error);
  },
);

export default axiosInstance;
