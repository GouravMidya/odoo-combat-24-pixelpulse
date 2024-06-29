import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { getAmenityByIds } from '../../utils/amenity';

const BASE_URL = process.env.REACT_APP_SERVER_URI;

const ReservationForm = ({ facilityId }) => {
  const [reservation, setReservation] = useState({
    facility: facilityId,
    amenity: '',
    startTime: null,
    endTime: null,
    notes: '',
  });
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [totalRate, setTotalRate] = useState(0);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const fetchedAmenities = await getAmenityByIds(facilityId);
        setAmenities(fetchedAmenities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching amenities:', error);
        setLoading(false);
      }
    };

    fetchAmenities();
  }, [facilityId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });

    if (name === 'amenity') {
      const selectedAmenity = amenities.find(amenity => amenity._id === value);
      setHourlyRate(selectedAmenity?.hourlyRate || 0);
    }
  };

  const handleDateChange = (name) => (date) => {
    const newReservation = { ...reservation, [name]: date };
    setReservation(newReservation);

    if (newReservation.startTime && newReservation.endTime) {
      const start = dayjs(newReservation.startTime);
      const end = dayjs(newReservation.endTime);
      if (end.isAfter(start)) {
        const duration = end.diff(start, 'hour', true);
        setTotalRate((duration * hourlyRate).toFixed(2));
      } else {
        setTotalRate(0);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedReservation = {
        ...reservation,
        totalCost: totalRate,
        startTime: reservation.startTime?.toISOString(),
        endTime: reservation.endTime?.toISOString(),
      };
      console.log(formattedReservation);
      const response = await axios.post(`${BASE_URL}/api/reservations`, formattedReservation);
      console.log('Reservation created:', response.data);
      // Handle success (e.g., show a success message, clear form, etc.)
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Make a Reservation
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="amenity-label">Amenity</InputLabel>
              <Select
                labelId="amenity-label"
                name="amenity"
                value={reservation.amenity}
                onChange={handleChange}
                required
              >
                {amenities.map((amenity) => (
                  <MenuItem key={amenity._id} value={amenity._id}>
                    {amenity.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Hourly Rate: ${hourlyRate}
            </Typography>

            <DateTimePicker
              label="Start Time"
              value={reservation.startTime}
              onChange={handleDateChange('startTime')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />

            <DateTimePicker
              label="End Time"
              value={reservation.endTime}
              onChange={handleDateChange('endTime')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Rate: ${totalRate}
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              name="notes"
              label="Notes"
              multiline
              rows={4}
              value={reservation.notes}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go to Payment Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ReservationForm;
