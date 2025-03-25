import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ange din backend-URL här

// Skapa en instans av axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lägg till en request interceptor för att inkludera JWT-token i varje anrop
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Exportera API-funktioner
export const fetchAuctions = async () => {
  const response = await api.get('/auctions');
  return response.data;
};

export const fetchAuctionById = async (id) => {
  const response = await api.get(`/auctions/${id}`);
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await api.post('/auctions', auctionData);
  return response.data;
};

export const placeBid = async (bidData) => {
  const response = await api.post('/bids', bidData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};