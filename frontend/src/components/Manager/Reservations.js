import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import { getManagerIdFromToken } from '../../utils/authdecode';
import { getFacility } from '../../utils/facility';
import { getAmenityByIds } from '../../utils/amenity';

const BASE_URL = process.env.REACT_APP_SERVER_URI;

function ManagerReservations() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedManagerId = getManagerIdFromToken(token);
          const response = await axios.get(`${BASE_URL}/api/employees/${decodedManagerId}`);
          
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    fetchFacilityData();
  }, []);

  const handleSearch = async () => {
    try {
      if (!startDate || !endDate) {
        console.error('Missing required parameters.');
        return;
      }

      const amenities = await getAmenityByIds(facility._id);
      const amenityIds = amenities.map(amenity => amenity._id);

      const reservationPromises = amenityIds.map(amenityId => 
        axios.post(`${BASE_URL}/api/reservations/amenity`, {
          amenityId,
          startDate,
          endDate,
        })
      );

      const reservationResponses = await Promise.all(reservationPromises);
      const allReservations = reservationResponses.flatMap(response => response.data);

      setReservations(allReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager Reservations
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="end-date"
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!startDate || !endDate}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <List sx={{ mt: 4 }}>
        {reservations.map((reservation) => (
          <ListItem key={reservation._id}>
            <ListItemText
              primary={`User: ${reservation.user}`}
              secondary={`Facility: ${reservation.facility}, Amenity: ${reservation.amenity}, Start Time: ${reservation.startTime}, End Time: ${reservation.endTime}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ManagerReservations;