// src/utils/amenity.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URI;

export const getAmenityByIds = async (facilityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/facility/${facilityId}`);
    console.log(response.data.amenities);
    return fetchAmenities(response.data.amenities);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    throw error;
  }
};


export const fetchAmenities = async (amenityIds) => {
      try {
        const promises = amenityIds.map(async (amenityId) => {
          const response = await axios.get(`${BASE_URL}/api/amenity/${amenityId}`);
          return response.data; // Assuming response.data contains amenity details
        });
        const amenitiesData = await Promise.all(promises);
        return amenitiesData
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };