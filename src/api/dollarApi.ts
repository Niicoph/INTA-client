import axios from 'axios';

const dollarApi = axios.create({
  baseURL: import.meta.env.VITE_DOLLAR_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default dollarApi;
