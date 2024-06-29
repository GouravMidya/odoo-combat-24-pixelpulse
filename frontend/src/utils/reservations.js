// src/utils/reservations.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URI;


export const getUserReservations = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/reservations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};
