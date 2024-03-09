import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, Snackbar, InputAdornment} from '@mui/material';
import { Error, CheckCircle, Email } from '@mui/icons-material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      // https://url-shortener-ax8r.onrender.com
      const response = await axios.post('https://url-shortener-ax8r.onrender.com/api/users/forgot-password', { email });
      setSnackbarMessage(response.data.message);
      setSnackbarMessage('Password reset link sent to email. Please check your inbox.');
      setSnackbarIcon(<CheckCircle />);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to send password reset email');
      setSnackbarIcon(<Error />);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4">Forgot Password</Typography>
        <Box
          component="form"
          sx={{
            mt: 3,
            width: '100%',
            maxWidth: '400px',
          }}
        >
        <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
          <Button onClick={handleForgotPassword} variant="contained" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={
            <Box display="flex" alignItems="center">
              {snackbarIcon}
              <Typography variant="body1" sx={{ ml: 1 }}>
                {snackbarMessage}
              </Typography>
            </Box>
          }
          sx={{
            backgroundColor: snackbarIcon === <CheckCircle /> ? '#4caf50' : '#f44336',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
          }}
        />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
