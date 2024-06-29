// src/components/Auth/Login.js
import React, { useState } from "react";
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
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, userType }
      );
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      // Redirect based on user role
      const userRole = response.data.user.role;
      if (userRole === "owner") {
        window.location.href = "/owner-dashboard";
      } else if (userRole === "manager") {
        window.location.href = "/manager-dashboard";
      } else if (userRole === "staff") {
        window.location.href = "/staff-dashboard";
      } else {
        window.location.href = "/user-dashboard";
      }
    } catch (error) {
      setError("Invalid credentials");
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
            Sign in
          </Typography>

          {error && <p>{error}</p>}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="userType-label">User Type</InputLabel>
              <Select
                labelId="userType-label"
                id="userType"
                value={userType}
                label="User Type"
                onChange={(e) => setUserType(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="/" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
