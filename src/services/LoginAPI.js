// Сервис входа

import axios from 'axios';
import buildQuery from '@/services/BuildQuery.js';

const apiURL = 'http://localhost:3001';

const loginAPI = ({ name, password }) => {
  return axios({
    method: 'GET',
    url: `${apiURL}/login`
      + buildQuery({ name, password }),
    withCredentials: true
    // headers: {
    //   'Content-Type': 'application/json',
    // }
  });
};

export default loginAPI;