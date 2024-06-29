// OwnerSignup.js

import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const OwnerSignup = () => {
    const [fullName, setFullName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessCity, setBusinessCity] = useState('');
    const [businessState, setBusinessState] = useState('');
    const [businessCountry, setBusinessCountry] = useState('');
    const [businessPostalCode, setBusinessPostalCode] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Example: Register owner details
            await axios.post('/api/auth/register/owner', {
                fullName,
                businessName,
                businessAddress: { businessAddress, businessCity, businessState, businessCountry, businessPostalCode },
                contactEmail,
                contactPhone
            });
            // Redirect to login or next step as needed
            window.location.href = '/login';
        } catch (error) {
            setError('Error registering owner');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LockOutlinedIcon />
                    <Typography component="h1" variant="h5">
                        Owner Sign up
                    </Typography>
                    {error && <p>{error}</p>}
                    <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoFocus
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessName"
                            label="Business Name"
                            name="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessAddress"
                            label="Business Address"
                            name="businessAddress"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessCity"
                            label="Business City"
                            name="businessCity"
                            value={businessCity}
                            onChange={(e) => setBusinessCity(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessState"
                            label="Business State"
                            name="businessState"
                            value={businessState}
                            onChange={(e) => setBusinessState(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessCountry"
                            label="Business Country"
                            name="businessCountry"
                            value={businessCountry}
                            onChange={(e) => setBusinessCountry(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="businessPostalCode"
                            label="Business Postal Code"
                            name="businessPostalCode"
                            value={businessPostalCode}
                            onChange={(e) => setBusinessPostalCode(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="contactEmail"
                            label="Contact Email"
                            name="contactEmail"
                            autoComplete="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="contactPhone"
                            label="Contact Phone"
                            name="contactPhone"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default OwnerSignup;
