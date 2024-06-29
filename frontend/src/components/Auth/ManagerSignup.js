// ManagerSignup.js

import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const ManagerSignup = () => {
    const [fullName, setFullName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyState, setCompanyState] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Example: Register manager details
            await axios.post('/api/auth/register/manager', {
                fullName,
                companyName,
                companyAddress: { companyAddress, companyCity, companyState, companyCountry, companyPostalCode },
                contactEmail,
                contactPhone
            });
            // Redirect to login or next step as needed
            window.location.href = '/login';
        } catch (error) {
            setError('Error registering manager');
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
                        Manager Sign up
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
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="companyAddress"
                            label="Company Address"
                            name="companyAddress"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="companyCity"
                            label="Company City"
                            name="companyCity"
                            value={companyCity}
                            onChange={(e) => setCompanyCity(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="companyState"
                            label="Company State"
                            name="companyState"
                            value={companyState}
                            onChange={(e) => setCompanyState(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="companyCountry"
                            label="Company Country"
                            name="companyCountry"
                            value={companyCountry}
                            onChange={(e) => setCompanyCountry(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="companyPostalCode"
                            label="Company Postal Code"
                            name="companyPostalCode"
                            value={companyPostalCode}
                            onChange={(e) => setCompanyPostalCode(e.target.value)}
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

export default ManagerSignup;
