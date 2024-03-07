import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, Snackbar, IconButton } from '@mui/material';
import { Error, CheckCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

const ResetPassword = () => {
  const { token } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });

  const initialValues = {
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log('Reset password request initiated with token:', token);

        const response = await axios.post(`https://url-shortener-ax8r.onrender.com/api/users/reset-password/${token}`, { email: 'user@example.com', token, newPassword: values.password });
        console.log('Reset password response:', response.data);

        setSnackbarMessage(response.data.message);
        setSnackbarIcon(<CheckCircle />);
        setOpenSnackbar(true);
        navigate('/login');
      } catch (error) {
        console.error('Error resetting password:', error);
        setSnackbarMessage('Failed to reset password');
        setSnackbarIcon(<Error />);
        setOpenSnackbar(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
        <Typography variant="h4">Reset Password</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            margin="normal"
            required
            {...formik.getFieldProps('password')}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <PasswordStrengthBar password={formik.values.password} style={{ marginTop: '10px' }} />
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </form>
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

export default ResetPassword;
