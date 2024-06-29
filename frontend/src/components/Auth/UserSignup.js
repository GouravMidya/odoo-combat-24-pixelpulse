import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        dateOfBirth,
        address: { street: address, city, state, country, postalCode },
      });
      window.location.href = "/login";
    } catch (error) {
      setError("Error registering user");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            User Sign up
          </Typography>
          {error && <p>{error}</p>}
          <Box
            component="form"
            onSubmit={handleSignup}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Street Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="state"
              label="State"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
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

export default UserSignup;
