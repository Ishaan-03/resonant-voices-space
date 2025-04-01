
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const register = (userData: { name: string; email: string; password: string }) => 
  api.post('/register', userData);

export const login = (credentials: { email: string; password: string }) => 
  api.post('/login', credentials);

// Posts API
export const getPosts = (params?: { category?: string; search?: string }) => 
  api.get('/posts', { params });

export const getPost = (id: number) => 
  api.get(`/posts/${id}`);

export const createPost = (postData: { 
  title: string; 
  content: string;
  excerpt: string;
  category: string;
}) => api.post('/posts', postData);

// Comments API
export const addComment = (postId: number, content: string) => 
  api.post(`/posts/${postId}/comments`, { content });

// Likes API
export const toggleLike = (postId: number) => 
  api.post(`/posts/${postId}/likes`);

export default api;
