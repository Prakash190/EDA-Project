import axios from 'axios';

// The FastAPI backend runs on 8000 by default.
// Configure CORS on the backend if not already done.
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
