import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'salmon' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="body1" color="inherit" style={{ flex: 1 }}>
            &copy; {new Date().getFullYear()} URL Shortener
          </Typography>
          <IconButton color="inherit" href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.linkedin.com/in/yourlinkedin/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
