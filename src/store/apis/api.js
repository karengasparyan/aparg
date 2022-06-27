import axios from 'axios';

const baseURL = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1';

export const api = axios.create({
  baseURL,
});


