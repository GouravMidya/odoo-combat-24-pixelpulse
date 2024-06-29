// src/utils/authdecode.js
import { jwtDecode } from 'jwt-decode'; // Correct way to import named export


export const getManagerIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.id; // Assuming userId is the correct field in your JWT payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};