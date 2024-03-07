
import React, { useState } from 'react';
import { DiEnvato } from 'react-icons/di';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Snackbar } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setSnackbarMessage('Logged out successfully');
    setOpenSnackbar(true);
    closeDrawer();
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <AppBar position="static" style={{background:'salmon'}}>
        <Toolbar>
          <DiEnvato style={{ fontSize: '35px' }} />
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
            <Link to="/create-url" style={{ color: 'inherit', textDecoration: 'none' }}>
              URL Shortener
            </Link>
          </Typography>
          
          <div>
            <IconButton color="inherit" onClick={openDrawer}>
              <ViewListIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
              <List>
                <ListItem button onClick={closeDrawer}>
                  <Link to="/create-url" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <HomeIcon />
                    <ListItemText primary="Home" />
                  </Link>
                </ListItem>
                <ListItem button onClick={closeDrawer}>
                  <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <InfoIcon />
                    <ListItemText primary="About" />
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={handleLogout}>
                  <LogoutIcon />
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default Header;
