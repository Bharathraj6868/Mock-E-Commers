import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add session ID
api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('sessionId');
  if (sessionId) {
    config.headers['session-id'] = sessionId;
  }
  return config;
});

// Response interceptor to handle session ID
api.interceptors.response.use((response) => {
  if (response.data.data?.sessionId) {
    localStorage.setItem('sessionId', response.data.data.sessionId);
  }
  return response;
});

// Products API
export const productService = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
};

// Cart API
export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => 
    api.post('/cart', { productId, quantity }),
  removeFromCart: (productId) => 
    api.delete(`/cart/${productId}`),
  updateQuantity: (productId, quantity) => 
    api.put(`/cart/${productId}`, { quantity }),
};

// Checkout API
export const checkoutService = {
  processCheckout: (cartItems, customerInfo) => 
    api.post('/checkout', { cartItems, customerInfo }),
};

export default api;