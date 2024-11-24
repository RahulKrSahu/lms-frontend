import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getBooks = () => axios.get(`${API_URL}/books`);
export const getBookById = (id) => axios.get(`${API_URL}/books/${id}`);
export const createBook = (book) => axios.post(`${API_URL}/books`, book);
export const updateBook = (id, book) =>
  axios.put(`${API_URL}/books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);
