// import axios from 'axios';

// // The FastAPI backend runs on 8000 by default.
// // Configure CORS on the backend if not already done.
// const api = axios.create({
//   baseURL: 'http://localhost:8000',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default api;



import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;