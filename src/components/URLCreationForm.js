import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoCopyOutline } from 'react-icons/io5';
import { Snackbar, Button, TextField, Grid, Paper, Typography, Divider, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import QRCode from 'qrcode.react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCopyIcon = styled(IoCopyOutline)(({ theme }) => ({
  fontSize: '1.5rem',
  cursor: 'pointer',
}));

const URLCreationForm = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    try {
      const authToken = localStorage.getItem('authToken');
      const decodedToken = JSON.parse(atob(authToken.split('.')[1]));      
      setUserRole(decodedToken.role);
    } catch (error) {
      console.error('Error decoding user role from authToken:', error);
    }
  }, []);

  const isValidURL = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const createShortURL = async () => {
    if (!isValidURL(longURL)) {
      setErrorMessage('Please enter a valid URL');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://url-shortener-ax8r.onrender.com/api/urls/create-url',
        { longURL, expiryDate },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const { shortURL } = response.data;
      setShortURL(shortURL);
      setErrorMessage('');
      setSnackbarSeverity('success');
      setSnackbarMessage('Short URL created successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      setErrorMessage('Error occurred while creating short URL');
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error occurred while creating short URL');
      setSnackbarOpen(true);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortURL)
      .then(() => {
        setSnackbarSeverity('success');
        setSnackbarMessage('Short URL copied to clipboard!');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error copying to clipboard');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Create a Short URL
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); createShortURL(); }}>
          <TextField
          label="Enter Long URL"
          variant="outlined"
          fullWidth
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          required
          sx={{ mb: 2 }} // Add margin bottom to create a gap
        />
        
        <TextField
          label="Expiry Date/Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          sx={{ mb: 2 }} // Add margin bottom to create a gap
        />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Create Short URL
            </Button>
          </form>
          {errorMessage && <MuiAlert severity="error" sx={{ mt: 2 }}>{errorMessage}</MuiAlert>}
          {shortURL && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" align="center" gutterBottom>
                Short URL:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <Typography variant="body1">
                  <a href={shortURL} rel="noreferrer" target="_blank" style={{width:'90px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
                    {shortURL}
                  </a>
                </Typography>
                <StyledCopyIcon onClick={handleCopyClick} />
                <QRCode value={shortURL} size={100} />
              </Box>
            </>
          )}
        </StyledPaper>
              <Grid item xs={12}>
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Select a page:
          </Typography>
          <Grid container spacing={1}>
            {userRole === 'admin' && (
              <>
                <Grid item xs={4}>
                  <Link to="/url-list" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>
                      All URL List
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/chart" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>
                      Chart
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                </Grid>
              </>
            )}
            {userRole === 'user' && (
              <>
                <Grid item xs={6}>
                  <Link to="/user-url-list" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>
                      URL List
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/user-charts" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" fullWidth>
                      Your Charts
                    </Button>
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </StyledPaper>
      </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default URLCreationForm;
