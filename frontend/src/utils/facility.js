// src/utils/facility.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URI;

export const getFacility = async (id) => {
  console.log('BASE_URL:', BASE_URL);
  try {
    const response = await axios.get(`${BASE_URL}/api/facility/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching facility:', error);
    throw error;
  }
};

// Add other API calls here as needed