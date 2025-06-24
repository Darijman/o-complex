import axios from 'axios';

const api = axios.create({
  baseURL: 'http://o-complex.com:1337',
});

export default api;
