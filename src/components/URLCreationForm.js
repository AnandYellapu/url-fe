import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoCopyOutline } from 'react-icons/io5';
import { Snackbar, Button, TextField, Grid, Paper, Typography, Divider, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import {QRCodeSVG} from 'qrcode.react';

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
                <QRCodeSVG value={shortURL} size={100} />
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
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { IoCopyOutline } from 'react-icons/io5';
// import { Snackbar, Button, TextField, Grid, Paper, Typography, Divider, Box, MenuItem, Select, FormControl, InputLabel, CircularProgress, Switch, FormControlLabel } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
// import { styled } from '@mui/system';
// import {QRCodeSVG} from 'qrcode.react';
// import Autocomplete from '@mui/material/Autocomplete';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   marginBottom: theme.spacing(4),
//   backgroundColor: theme.palette.background,
// }));



// const StyledCopyIcon = styled(IoCopyOutline)(({ theme }) => ({
//   fontSize: '1.5rem',
//   cursor: 'pointer',
//   transition: 'transform 0.2s, color 0.2s',
//   '&:hover': {
//     color: theme.palette.primary.main,
//     transform: 'scale(1.2)',
//   },
// }));

// const AnimatedButton = styled(Button)(({ theme }) => ({
//   position: 'relative',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     width: '100%',
//     height: '2px',
//     left: '0',
//     bottom: '0',
//     transition: 'width 0.3s',
//   },
//   '&:hover::after': {
//     width: '100%',
//   },
// }));

// const URLCreationForm = () => {
//   const [longURL, setLongURL] = useState('');
//   const [shortURL, setShortURL] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState('');
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [qrSize, setQrSize] = useState(128);
//   const [qrColor, setQrColor] = useState('#000000');
//   const [qrErrorCorrection, setQrErrorCorrection] = useState('L');
//   const [isCreating, setIsCreating] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [urlMetadata, setUrlMetadata] = useState(null);

//   useEffect(() => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
//       setUserRole(decodedToken.role);
//     } catch (error) {
//       console.error('Error decoding user role from authToken:', error);
//     }
//   }, []);

//   const isValidURL = (url) => {
//     const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
//     return pattern.test(url);
//   };

//   const fetchURLMetadata = async (url) => {
//     try {
//       const response = await axios.get(`https://url-metadata-fetcher.com/api?url=${encodeURIComponent(url)}`);
//       setUrlMetadata(response.data);
//     } catch (error) {
//       console.error('Error fetching URL metadata:', error);
//     }
//   };

//   const handleURLChange = (e) => {
//     const url = e.target.value;
//     setLongURL(url);
//     if (isValidURL(url)) {
//       fetchURLMetadata(url);
//     } else {
//       setUrlMetadata(null);
//     }
//   };

//   const createShortURL = async () => {
//     if (!isValidURL(longURL)) {
//       setErrorMessage('Please enter a valid URL');
//       return;
//     }

//     setIsCreating(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://url-shortener-ax8r.onrender.com/api/urls/create-url',
//         { longURL, expiryDate },
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );

//       const { shortURL } = response.data;
//       setShortURL(shortURL);
//       setErrorMessage('');
//       setSnackbarSeverity('success');
//       setSnackbarMessage('Short URL created successfully!');
//       setSnackbarOpen(true);
//     } catch (error) {
//       setErrorMessage('Error occurred while creating short URL');
//       console.error(error);
//       setSnackbarSeverity('error');
//       setSnackbarMessage('Error occurred while creating short URL');
//       setSnackbarOpen(true);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleCopyClick = () => {
//     navigator.clipboard.writeText(shortURL)
//       .then(() => {
//         setSnackbarSeverity('success');
//         setSnackbarMessage('Short URL copied to clipboard!');
//         setSnackbarOpen(true);
//       })
//       .catch((error) => {
//         console.error('Error copying to clipboard:', error);
//         setSnackbarSeverity('error');
//         setSnackbarMessage('Error copying to clipboard');
//         setSnackbarOpen(true);
//       });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const topWebsites = [
//     'https://www.google.com',
//     'https://www.facebook.com',
//     'https://www.twitter.com',
//     'https://www.instagram.com',
//     'https://www.linkedin.com'
//   ];

//   return (
//     <Box sx={{ bgcolor: darkMode ? '#121212' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh', p: 3 }}>
//       <FormControlLabel
//         control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
//         label="Dark Mode"
//       />
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <StyledPaper>
//             <Typography variant="h5" gutterBottom>
//               Create a Short URL
//             </Typography>
//             <form onSubmit={(e) => { e.preventDefault(); createShortURL(); }}>
//               <Autocomplete
//                 freeSolo
//                 options={topWebsites}
//                 value={longURL}
//                 onChange={(event, newValue) => setLongURL(newValue)}
//                 inputValue={longURL}
//                 onInputChange={(event, newInputValue) => handleURLChange({ target: { value: newInputValue } })}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Enter Long URL"
//                     variant="outlined"
//                     fullWidth
//                     required
//                     error={!!errorMessage}
//                     helperText={errorMessage || ' '}
//                     sx={{ mb: 2 }} // Add margin bottom to create a gap
//                   />
//                 )}
//               />
//               <TextField
//                 type="datetime-local"
//                 variant="outlined"
//                 fullWidth
//                 value={expiryDate}
//                 onChange={(e) => setExpiryDate(e.target.value)}
//                 sx={{ mb: 2 }} // Add margin bottom to create a gap
//               />
//               <AnimatedButton type="submit" variant="contained" sx={{ mt: 2 }} disabled={isCreating}>
//                 {isCreating ? <CircularProgress size={24} /> : 'Create Short URL'}
//               </AnimatedButton>
//             </form>
//             {urlMetadata && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="h6">URL Preview:</Typography>
//                 <Typography variant="body2"><strong>Title:</strong> {urlMetadata.title}</Typography>
//                 <Typography variant="body2"><strong>Description:</strong> {urlMetadata.description}</Typography>
//               </Box>
//             )}
//             {shortURL && (
//               <>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="subtitle1" align="center" gutterBottom>
//                   Short URL:
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
//                   <Typography variant="body1">
//                     <a href={shortURL} rel="noreferrer" target="_blank" style={{ width: '90px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
//                       {shortURL}
//                     </a>
//                   </Typography>
//                   <StyledCopyIcon onClick={handleCopyClick} />
//                   <QRCodeSVG value={shortURL} size={qrSize} fgColor={qrColor} level={qrErrorCorrection} />
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: '10px' }}>
//                   <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//                     <InputLabel>Size</InputLabel>
//                     <Select
//                       value={qrSize}
//                       onChange={(e) => setQrSize(e.target.value)}
//                       label="Size"
//                     >
//                       <MenuItem value={64}>64</MenuItem>
//                       <MenuItem value={128}>128</MenuItem>
//                       <MenuItem value={256}>256</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <TextField
//                     label="QR Color"
//                     type="color"
//                     value={qrColor}
//                     onChange={(e) => setQrColor(e.target.value)}
//                     sx={{ width: 100 }}
//                   />
//                   <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//                     <InputLabel>Error Correction</InputLabel>
//                     <Select
//                       value={qrErrorCorrection}
//                       onChange={(e) => setQrErrorCorrection(e.target.value)}
//                       label="Error Correction"
//                     >
//                       <MenuItem value="L">Low</MenuItem>
//                       <MenuItem value="M">Medium</MenuItem>
//                       <MenuItem value="Q">Quartile</MenuItem>
//                       <MenuItem value="H">High</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>
//                 <Button
//                   variant="outlined"
//                   sx={{ mt: 2 }}
//                   onClick={() => {
//                     const canvas = document.querySelector('canvas');
//                     const pngUrl = canvas.toDataURL('image/png');
//                     const downloadLink = document.createElement('a');
//                     downloadLink.href = pngUrl;
//                     downloadLink.download = 'qrcode.png';
//                     downloadLink.click();
//                   }}
//                 >
//                   Download QR Code
//                 </Button>
//               </>
//             )}
//           </StyledPaper>
//           <Grid item xs={12}>
//             <StyledPaper>
//               <Typography variant="h5" gutterBottom>
//                 Select a page:
//               </Typography>
//               <Grid container spacing={1}>
//                 {userRole === 'admin' && (
//                   <>
//                     <Grid item xs={4}>
//                       <Link to="/url-list" style={{ textDecoration: 'none' }}>
//                         <Button variant="outlined" fullWidth>
//                           All URL List
//                         </Button>
//                       </Link>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Link to="/chart" style={{ textDecoration: 'none' }}>
//                         <Button variant="outlined" fullWidth>
//                           Chart
//                         </Button>
//                       </Link>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Link to="/dashboard" style={{ textDecoration: 'none' }}>
//                         <Button variant="outlined" fullWidth>
//                           Dashboard
//                         </Button>
//                       </Link>
//                     </Grid>
//                   </>
//                 )}
//                 {userRole === 'user' && (
//                   <>
//                     <Grid item xs={6}>
//                       <Link to="/user-url-list" style={{ textDecoration: 'none' }}>
//                         <Button variant="outlined" fullWidth>
//                           URL List
//                         </Button>
//                       </Link>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Link to="/user-charts" style={{ textDecoration: 'none' }}>
//                         <Button variant="outlined" fullWidth>
//                           Your Charts
//                         </Button>
//                       </Link>
//                     </Grid>
//                   </>
//                 )}
//               </Grid>
//             </StyledPaper>
//           </Grid>
//         </Grid>
//         <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//           <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//             {snackbarMessage}
//           </MuiAlert>
//         </Snackbar>
//       </Grid>
//     </Box>
//   );
// };

// export default URLCreationForm;














