import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Box,
  ListItem,
  ListItemText,
  Button,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';

const getInitial = (day) => day.charAt(0).toUpperCase();

const BASE_URL = process.env.REACT_APP_SERVER_URI;

const Browse = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState(15000); // Default range is 15km

  const fetchFacilities = async (latitude, longitude) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/facility/nearby`, {
        longitude,
        latitude,
        distance: range
      });
      setFacilities(response.data.facilities);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch facilities');
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserLocationAndFetchFacilities = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = parseFloat(position.coords.latitude.toFixed(5));
            const longitude = parseFloat(position.coords.longitude.toFixed(5));
            console.log(latitude,longitude);
            fetchFacilities(latitude, longitude);
          },
          (err) => {
            setError('Failed to get user location: ' + err.message);
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
      }
    };

    getUserLocationAndFetchFacilities();
  }, [range]); // Re-run when range changes

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Nearby Facilities and Amenities</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Range</InputLabel>
        <Select
          value={range}
          label="Range"
          onChange={handleRangeChange}
        >
          <MenuItem value={2500}>5 km</MenuItem>
          <MenuItem value={5000}>10 km</MenuItem>
          <MenuItem value={10000}>15 km</MenuItem>
          <MenuItem value={15000}>20 km</MenuItem>
          <MenuItem value={25000}>25 km</MenuItem>
        </Select>
      </FormControl>
      {facilities.length === 0 ? (
        <Typography>No facilities found within {range/100} km.</Typography>
      ) : (
        <Grid container spacing={3}>
          {facilities.map((facility) => (
            <Grid item xs={12} key={facility._id}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5">{facility.name}</Typography>
                      <Typography variant="body1">{facility.description}</Typography>
                      <Typography variant="body2">Type: {facility.type}</Typography>
                      <Typography variant="body2">Business Type: {facility.business_type}</Typography>
                      <Typography variant="body2">Capacity: {facility.capacity}</Typography>
                      <Typography variant="body2">Hourly Rate: ${facility.hourlyRate}</Typography>
                      <Chip
                        label={facility.isActive ? 'Active' : 'Inactive'}
                        color={facility.isActive ? 'success' : 'error'}
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6">Availability Schedule:</Typography>
                      <Box display="flex" justifyContent="flex-start" sx={{ padding: 0 }}>
                        {Object.entries(facility.availabilitySchedule).map(([day, schedule]) => (
                          <ListItem key={day} sx={{ padding: '0px 0px' }}>
                            <ListItemText
                              primary={
                                <Box
                                  component="span"
                                  sx={{
                                    backgroundColor: schedule.open.toLowerCase() === 'yes' ? 'green' : 'red',
                                    color: 'white',
                                    padding: '0.2em 0.4em',
                                    borderRadius: '0.2em',
                                    display: 'inline-block',
                                    width: '1.5em',
                                    textAlign: 'center',
                                    margin: '0 2px',
                                  }}
                                >
                                  {getInitial(day)}
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/user/reservation/`} // Assuming you have a dynamic route for reservations
                  >
                    Make Reservation
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Browse;