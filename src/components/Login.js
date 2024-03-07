import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Link as MuiLink, IconButton, Snackbar, Container, Box } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, CheckCircle, Error, Email } from '@mui/icons-material';


const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = {
      identifier,
      password,
    };
  
    try {
      const response = await axios.post('https://url-shortener-ax8r.onrender.com/api/users/login', userData);
      const { token, user } = response.data;
  
      // Save the token to localStorage or any state management tool of your choice
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user._id);
  
      setSnackbarMessage('Login successful');
      setSnackbarIcon(<CheckCircle />);
      setOpenSnackbar(true);
  
      // Close Snackbar after 3 seconds
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate('/create-url'); // Redirect to the create URL page or any protected route
      }, 1000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setSnackbarMessage('User does not exist');
      } else {
        setSnackbarMessage('Account not activated');
      }
      setSnackbarIcon(<Error />);
      setOpenSnackbar(true);
  
      // Close Snackbar after 3 seconds
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 2000); // 3000 milliseconds = 3 seconds
    }
  };
  

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the reset password page
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Typography variant="h4">Login</Typography>
        <Box
          component="form"
          sx={{
            mt: 3,
            width: '100%',
            maxWidth: '400px', // Adjust the max width as needed
          }}
        >
          <TextField
            fullWidth
            label="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: <Email />,
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: <LockOutlined />,
              endAdornment: (
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button onClick={handleLogin} variant="contained" startIcon={<LockOutlined />} sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          <MuiLink href="#" onClick={handleForgotPassword}>
             Forgot Password?
          </MuiLink>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Not yet registered? <Link to="/register"> Register</Link>
        </Typography>
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
            backgroundColor: snackbarIcon === <CheckCircle /> ? '#4caf50' : '#f44336', // Green color for success messages, red color for error messages
            color: '#fff', // White text color
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)', // Box shadow for depth
            '& .MuiSnackbarContent-message': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiIconButton-root': {
              color: '#fff', // White color for close icon
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Login;
