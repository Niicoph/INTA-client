import axios from 'axios';

const sipanApi = axios.create({
  baseURL: import.meta.env.VITE_SIPAN_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

export default sipanApi;