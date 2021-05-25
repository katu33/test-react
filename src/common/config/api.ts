import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cyb06ylby6.execute-api.ap-southeast-1.amazonaws.com/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

instance.interceptors.request.use(function(config) {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;