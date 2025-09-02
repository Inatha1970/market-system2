import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', response.data.access);
          return api.request(error.config);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE_URL}/token/`, credentials),
  refresh: (refreshToken) => axios.post(`${API_BASE_URL}/token/refresh/`, { refresh: refreshToken }),
};

export const productsAPI = {
  getAll: () => api.get('/products/'),
  getCategories: () => api.get('/categories/'),
};

export const salesAPI = {
  create: (saleData) => api.post('/sales/create/', saleData),
  getAll: () => api.get('/sales/'),
  getDashboard: () => api.get('/sales/dashboard/'),
  getReceipt: (saleId) => api.get(`/sales/receipt/${saleId}/`),
};

export const reportsAPI = {
  generate: (reportType) => api.post('/reports/generate/', { report_type: reportType }),
  getAll: () => api.get('/reports/'),
  getAdminReports: () => api.get('/admin/reports/'),
};

export default api;