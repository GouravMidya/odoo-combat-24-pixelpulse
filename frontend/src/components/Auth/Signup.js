import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  MenuItem,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const Signup = () => {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Assuming you need to register the role first before redirecting
      // Example: Register the role in backend or set it in session/cookie
      // Then redirect based on the selected role
      switch (role) {
        case "Organization":
          window.location.href = "/signup/create-organization-with-owner";
          break;
        case "User":
          window.location.href = "/signup/user";
          break;
        default:
          setError("Role selection error");
      }
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
            Sign up
          </Typography>
          {error && <p>{error}</p>}
          <Box
            component="form"
            onSubmit={handleSignup}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              select
              fullWidth
              margin="normal"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Organization">Organization</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Grid container>
              <Grid item>
                <Typography
                  align="center"
                  style={{ textAlign: "center" }}
                  alignContent="center"
                >
                  <a href="/login" variant="body2">
                    Already have an account? Sign in
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
