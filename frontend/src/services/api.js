import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // backend-URL här

// Skapa en instans av axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Här JWT-token inkluderade i varje anrop
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Här API-funktioner exporterade
export const fetchAuctions = async () => {
  const response = await fetch('http://localhost:5000/api/auctions');
  const data = await response.json();
  
  // Här svaret är 'auctions'
  return Array.isArray(data) ? data : data.auctions || [];
};

export const fetchAuction = async (id) => {
  const response = await fetch(`http://localhost:5000/api/auctions/${id}`);
  if (!response.ok) {
    throw new Error('Auktionen hittades inte');
  }
  return response.json();
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

// Här funktion för att söka auktioner
export const searchAuctions = async (searchParams) => {
  try {
    const { query, category, status } = searchParams;

    // Här Skickar vi en GET-förfrågan till backend med sökparametrar
    const response = await api.get('/auctions/search', {
      params: {
        query,   // Här skickar vi den korrekta parametern 'query'
        category, // Skicka kategori om den finns
        status,   // Skicka status om den finns
      },
    });

    return response.data; // Returnera de hittade auktionerna
  } catch (error) {
    console.error('Error searching auctions:', error);
    throw error;
  }
};
