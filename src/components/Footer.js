// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="footer-container">
//       <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;




import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: 'salmon', padding: '20px', textAlign: 'center' }} className='footer-container'>
      <Container>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
