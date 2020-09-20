import axios from '../axios';
import { withQuery } from './utils';

export const create = (record) => {
  return axios.post('/records', record).then((res) => res.data);
};

export const list = (query) => {
  return axios.get(withQuery('/records', query)).then((res) => res.data);
};

export const get = (id, query) => {
  return axios.get(withQuery(`/records/${id}`, query)).then((res) => res.data);
};

export const remove = (id) => {
  return axios.delete(`records/${id}`).then((res) => res.data);
}