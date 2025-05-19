import axios from 'axios';

const dollarApi = axios.create({
  baseURL: import.meta.env.VITE_DOLLAR_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// *aca pueden ir los interceptors

export default dollarApi;
