import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { showReduxSnackbar } from "../store/slices/snackbarSlice";

const professionsList = ["Student", "Developer", "Analyst", "Manager"];

const RequiresLogin = () => {
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setProfession(event.target.value);
  };

  const handleLogin = () => {
    if (username && profession) {
      dispatch(login({ username, profession }));
      dispatch(
        showReduxSnackbar({
          message: "Successfully logged in",
          severity: "success",
        })
      );
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Login Required
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" mb={3}>
            This route is protected using an authentication mechanism in our app.
            <br />
            We're demonstrating two approaches: using a Higher-Order Component (HOC) and a layout
            wrapper via React Router’s `Outlet`.
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            <strong>Note:</strong> This is a dummy login for demonstration purposes. Enter any
            username and select a profession to simulate authentication. The login state is stored
            using Redux and persisted using redux-persist.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />

            <FormControl fullWidth>
              <InputLabel id="profession-label">Profession</InputLabel>
              <Select
                labelId="profession-label"
                value={profession}
                label="Profession"
                onChange={handleChange}
              >
                {professionsList.map((prof, idx) => (
                  <MenuItem key={idx} value={prof}>
                    {prof}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={!username || !profession}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RequiresLogin;
