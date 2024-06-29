import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const CreateOrganizationWithOwner = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [organizationCity, setOrganizationCity] = useState("");
  const [organizationState, setOrganizationState] = useState("");
  const [organizationCountry, setOrganizationCountry] = useState("");
  const [organizationPostalCode, setOrganizationPostalCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleCreateOrganizationWithOwner = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/organizations/create-organization-with-owner",
        {
          name: organizationName,
          address: {
            street: organizationAddress,
            city: organizationCity,
            state: organizationState,
            country: organizationCountry,
            postalCode: organizationPostalCode,
          },
          contactEmail,
          contactPhone,
          ownerFirstName,
          ownerLastName,
          ownerEmail,
          ownerPassword,
          ownerPhoneNumber,
        }
      );
      // Redirect to login or next step as needed
      window.location.href = "/login";
    } catch (error) {
      setError("Error creating organization and owner");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Organization Signup
          </Typography>
          {error && <p>{error}</p>}
          <Box
            component="form"
            onSubmit={handleCreateOrganizationWithOwner}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Organization Details</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationName"
                  label="Organization Name"
                  name="organizationName"
                  autoFocus
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationAddress"
                  label="Street Address"
                  name="organizationAddress"
                  value={organizationAddress}
                  onChange={(e) => setOrganizationAddress(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationCity"
                  label="City"
                  name="organizationCity"
                  value={organizationCity}
                  onChange={(e) => setOrganizationCity(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationState"
                  label="State"
                  name="organizationState"
                  value={organizationState}
                  onChange={(e) => setOrganizationState(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationCountry"
                  label="Country"
                  name="organizationCountry"
                  value={organizationCountry}
                  onChange={(e) => setOrganizationCountry(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organizationPostalCode"
                  label="Postal Code"
                  name="organizationPostalCode"
                  value={organizationPostalCode}
                  onChange={(e) => setOrganizationPostalCode(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="contactEmail"
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Owner Details</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerFirstName"
                  label="First Name"
                  name="ownerFirstName"
                  value={ownerFirstName}
                  onChange={(e) => setOwnerFirstName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerLastName"
                  label="Last Name"
                  name="ownerLastName"
                  value={ownerLastName}
                  onChange={(e) => setOwnerLastName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerEmail"
                  label="Email"
                  name="ownerEmail"
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerPassword"
                  label="Password"
                  name="ownerPassword"
                  type="password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerPhoneNumber"
                  label="Phone Number"
                  name="ownerPhoneNumber"
                  value={ownerPhoneNumber}
                  onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Organization with Owner
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateOrganizationWithOwner;
