import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getRentals = () => axios.get(`${API_URL}/rentals`);
export const getRentalById = (id) => axios.get(`${API_URL}/rentals/${id}`);
export const createRental = (rental) =>
  axios.post(`${API_URL}/rentals`, rental);
export const updateRental = (id, rental) =>
  axios.put(`${API_URL}/rentals/${id}`, rental);
export const deleteRental = (id) => axios.delete(`${API_URL}/rentals/${id}`);
export const markAsReturned = (id) =>
  axios.patch(`${API_URL}/rentals/${id}/return`);
export const markAsLost = (id) =>
  axios.patch(`${API_URL}/rentals/${id}/mark-as-lost`);
