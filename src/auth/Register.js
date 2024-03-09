import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Link, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, Snackbar, Container, Box } from '@mui/material';
import { Visibility, VisibilityOff, Close, AccountCircle, Email, CheckCircle, Error, LockOutlined } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

function Register() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState('');

  const initialValues = {
    username: '',
    email: '',
    password: '',
    showPassword: false
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // https://url-shortener-ax8r.onrender.com
      const response = await axios.post('https://url-shortener-ax8r.onrender.com/api/users/register', values);
      console.log('Registration successful!', response.data);
      setSnackbarMessage('Registration successful!');
      setSnackbarIcon(<CheckCircle />);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate('/login'); // Redirect to login page after a delay
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Registration failed!', error.response.data);
      setSnackbarMessage('Registration failed!');
      setSnackbarIcon(<Error />);
      setOpenSnackbar(true);
      // Handle error, maybe show an error message to the user
    } finally {
      setSubmitting(false);
    }
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
        <Typography variant="h4">Register</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form
              sx={{
                mt: 3,
                width: '100%',
                maxWidth: '400px', // Adjust the max width as needed
              }}
            >
              <Field
                as={TextField}
                fullWidth
                label="Username"
                id="username"
                name="username"
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="username" component="div" />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                id="email"
                name="email"
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="email" component="div" />
              <Field
                as={FormControl}
                fullWidth
                variant="outlined"
                margin="normal"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setFieldValue('showPassword', !values.showPassword)} edge="end">
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  }
                />
              </Field>
              <ErrorMessage name="password" component="div" />
              <PasswordStrengthBar password={values.password} />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already registered? <Link href="/login">Login here</Link>
        </Typography>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={
            <Box display="flex" alignItems="center">
              {snackbarIcon}
              <Typography variant="body1" sx={{ ml: 1 }}>
                {snackbarMessage}
              </Typography>
            </Box>
          }
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
              <Close fontSize="small" />
            </IconButton>
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
}

export default Register;
