// Сервис входа

import axios from 'axios';

const apiURL = 'http://localhost:3001';

// Превращаем объект в query params string,
// (все не truthy свойства, кроме 0 пропускаем)
function buildQueryParams(params) {
  let queryParams = [];
  Object.keys(params).forEach(key => {
    if(params[key] || params[key] === 0) {
      queryParams.push(`${key}=${params[key]}`);
    }
  });

  if(queryParams.length > 0) {
    return '?' + queryParams.join('&');
  
  } else return '';
}

const Login = ({ name, password }) => {
  return axios({
    method: 'GET',
    url: `${apiURL}/login`
      + buildQueryParams({ name, password }),
    // headers: {
    //   'Content-Type': 'application/json',
    // }
  });
};

export default Login;