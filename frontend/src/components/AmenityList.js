// src/components/AmenityList.js

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography,Chip, Grid, Container } from '@mui/material';
import axios from 'axios';

const AmenityList = ({ amenityIds }) => {
  const [amenities, setAmenities] = useState([]);
  const URL=process.env.REACT_APP_SERVER_URI;
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const promises = amenityIds.map(async (amenityId) => {
          const response = await axios.get(`${URL}/api/amenity/${amenityId}`);
          return response.data; // Assuming response.data contains amenity details
        });
        const amenitiesData = await Promise.all(promises);
        setAmenities(amenitiesData);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    if (amenityIds.length > 0) {
      fetchAmenities();
    }
  }, [amenityIds]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>
        Amenity Dashboard
      </Typography>
    <Grid container spacing={3}>
       
      {amenities.map((amenity) => (
        <Grid item xs={12} md={12} key={amenity._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{amenity.name}</Typography>
              <Typography variant="body2">{amenity.description}</Typography>
              <Typography variant="body2">Capacity: {amenity.capacity}</Typography>
              <Typography variant="body2">Hourly Rate: {amenity.hourlyRate}</Typography>
              <Chip label={amenity.isActive ? 'Active' : 'Inactive'} color={amenity.isActive ? 'success' : 'error'} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default AmenityList;
