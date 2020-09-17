import axios from '../axios';
import { withQuery } from './utils';

export const list = async (queries) => {
  return axios.get(withQuery('/tests', queries)).then((res) => res.data);
};

export const getById = async (id) => {
  return axios.get(`/tests/${id}`).then((res) => res.data);
};
