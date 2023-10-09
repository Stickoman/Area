import axios from 'axios';

export function configureAxios(): void {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL as string;
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE';
}
