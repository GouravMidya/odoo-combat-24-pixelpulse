import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("manager");
  const [organizationId, setOrganizationId] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch organization ID when component mounts
    const fetchOrganizationId = async () => {
      try {
        // Replace with your API call to get the organization ID of the current owner
        const response = await axios.get(
          "http://localhost:5000/api/organization/current"
        );
        setOrganizationId(response.data.organizationId);
      } catch (error) {
        setError("Error fetching organization ID. Please try again.");
      }
    };

    fetchOrganizationId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/employees", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
        organizationId,
        hireDate,
      });
      setSuccess("Employee created successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setRole("manager");
      setHireDate("");
    } catch (error) {
      setError("Error creating employee. Please try again.");
    } finally {
      setIsLoading(false);
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
          <Typography component="h1" variant="h5">
            Create Employee
          </Typography>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <Box
            component="form"
            onSubmit={handleSubmit}
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
              autoComplete="given-name"
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
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
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
              autoComplete="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="hireDate"
              label="Hire Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Create Employee"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateEmployee;
