import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Chip, Box, ListItem, ListItemText } from '@mui/material';
import { getFacility } from '../../utils/facility';
import AmenityList from '../AmenityList';
import { getManagerIdFromToken } from '../../utils/authdecode';
import axios from 'axios';

function Dashboard() {
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        // Fetch token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
          const decodedManagerId = getManagerIdFromToken(token);
          console.log("HERE",decodedManagerId);
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/employees/${decodedManagerId}`);
          console.log("RESPONE",response.data.organization.facilities);
          const facilityID = response.data.organization;
          
          // Assuming managerData contains facilityId
          const facilityData = await getFacility('667fb9d31bcbf5bbb9a7e7da'); //replace by facilityId
          setFacility(facilityData);
        }
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    fetchFacilityData();
  }, []);

  if (!facility) return <Typography>Loading...</Typography>;

  const getInitial = (day) => day.charAt(0).toUpperCase();
  const getColor = (isOpen) => (isOpen ? 'green' : 'red');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Facility Dashboard
      </Typography>
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
              <br />
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
      </Card>
      <br />
      <AmenityList amenityIds={facility.amenities} />
    </Container>
  );
}

export default Dashboard;
