import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('login');
const { VITE_SERVER_URL } = import.meta.env;

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
  baseURL: VITE_SERVER_URL,
});

export default axiosInstance;
