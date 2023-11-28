// import React, { useState } from 'react';
// import { DiEnvato } from 'react-icons/di';
// import { Link, useNavigate } from 'react-router-dom';
// // import { FaSignOutAlt } from 'react-icons/fa';
// import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
// import ViewListIcon from '@mui/icons-material/ViewList';

// const Header = () => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleLogout = () => {
//     // Your logic to clear the authentication token
//     localStorage.removeItem('authToken');
//     // Redirect to the login page or any other desired page after logout
//     navigate('/login');
//     handleClose();
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="static" style={{ backgroundColor: 'salmon' }}>
//       <Toolbar>
//         <DiEnvato style={{ fontSize: '35px' }} />
//         <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
//           <Link to="/create-url" style={{ color: 'white', textDecoration: 'none' }}>
//             URL Shortener
//           </Link>
//         </Typography>
        
//         <div>
//           <IconButton color="inherit" onClick={handleMenuClick}>
//             <ViewListIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClose}>
//               <Link to="/create-url" style={{ color: 'black', textDecoration: 'none' }}>
//                 Home
//               </Link>
//             </MenuItem>
//             <MenuItem onClick={handleClose}>
//               <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}>
//                 About
//               </Link>
//             </MenuItem>
//             <MenuItem onClick={handleLogout}>
//               Logout
//             </MenuItem>
//           </Menu>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;





import React, { useState } from 'react';
import { DiEnvato } from 'react-icons/di';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    // Your logic to clear the authentication token
    localStorage.removeItem('authToken');
    // Redirect to the login page or any other desired page after logout
    navigate('/login');
    closeDrawer();
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'salmon' }}>
      <Toolbar>
        <DiEnvato style={{ fontSize: '35px' }} />
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
          <Link to="/create-url" style={{ color: 'white', textDecoration: 'none' }}>
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
                <Link to="/create-url" style={{ color: 'black', textDecoration: 'none' }}>
                  <ListItemText primary="Home" />
                </Link>
              </ListItem>
              <ListItem button onClick={closeDrawer}>
                <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}>
                  <ListItemText primary="About" />
                </Link>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
