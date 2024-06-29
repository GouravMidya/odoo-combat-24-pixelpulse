import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function Reservations() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      if (!startDate || !endDate) {
        setError('Please select both start and end dates.');
        return;
      }

      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      const response = await axios.get(`/api/reservations?startDate=${startDate}&endDate=${endDate}`);
      setReservations(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Error fetching reservations. Please try again later.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Reservations</Typography>
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
            inputProps={{
              min: startDate || undefined, // Set min date to startDate if it's selected
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={!startDate || !endDate}>
            Search
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <List sx={{ mt: 4 }}>
        {reservations.map((reservation) => (
          <ListItem key={reservation._id}>
            <ListItemText
              primary={`User: ${reservation.user}`}
              secondary={`Facility: ${reservation.facility}, Start Time: ${reservation.startTime}, End Time: ${reservation.endTime}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Reservations;
