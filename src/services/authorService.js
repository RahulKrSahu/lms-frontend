import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getAuthors = () => {
  return axios.get(`${API_URL}/authors`);
};

export const getAuthorById = (id) => {
  return axios.get(`${API_URL}/authors/${id}`);
};

export const createAuthor = (author) => {
  return axios.post(`${API_URL}/authors`, author);
};

export const updateAuthor = (id, author) => {
  return axios.put(`${API_URL}/authors/${id}`, author);
};

export const deleteAuthor = (id) => {
  return axios.delete(`${API_URL}/authors/${id}`);
};
