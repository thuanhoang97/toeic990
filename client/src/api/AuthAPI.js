import axios from '../axios';

export const login = (username, password) => {
  return axios
    .post('/auth/login', {
      username,
      password,
    })
    .then((res) => res.data.token);
};

export const register = (newAccount) => {
  return axios.post('/auth/register', newAccount).then((res) => res.data);
};
