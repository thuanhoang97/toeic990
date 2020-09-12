import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  // console.log('Request???', config);
  return config;
});

instance.interceptors.response.use((res) => {
  // console.log('Response??');
  return res;
}, (err) => {
  // Catch error here.
  return Promise.reject(err);
});

export default instance;