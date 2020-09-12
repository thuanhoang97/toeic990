import axios from '../axios';

export const list = async () => {
  return axios.get('/tests').then((res) => res.data);
};

export const getById = async (id) => {
  return axios.get(`/tests/${id}`).then((res) => res.data);
};
