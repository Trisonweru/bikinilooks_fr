"use client";

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase, Button, IconButton, Badge, Menu, MenuItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: { spacing: (arg0: number, arg1: number | undefined) => any; palette: { background: { paper: any; }; }; shadows: any[]; shape: { borderRadius: any; }; }) => ({
  navbar: {
    width: '80%',
    top: 0,
    zIndex: 50,
    transition: 'all 0.3s',
    '&.scrolled': {
      height: '70px', // Adjust as needed
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    transition: 'transform 0.3s',
    '&.scrolled': {
      transform: 'scale(0.75)', // Adjust as needed
    },
  },
  categoriesDropdown: {
    position: 'relative',
    '&:hover $dropdownMenu': {
      display: 'block',
    },
  },
  dropdownMenu: {
    display: 'none',
    position: 'absolute',
    left: 0,
    marginTop: theme.spacing(1),
    width: '200px', // Adjust as needed
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    zIndex: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen(true);
  };

  const handleCloseMenu = () => {
    setIsDropdownOpen(false);
  };

  return (
    <AppBar position="fixed" className={`${classes.navbar} ${isScrolled ? 'scrolled' : ''}`}>
      <Toolbar className={classes.toolbar}>
        <div>
          <InputBase
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <Typography variant="h6" className={`${classes.logo} ${isScrolled ? 'scrolled' : ''}`}>
            Logo
          </Typography>
        </div>
        <div>
          <Button onClick={() => alert('Login button clicked')} className="border-r pr-4 border-gray-300">Login</Button>
          <IconButton onClick={() => alert('Cart button clicked')}>
            <Badge badgeContent={3} color="error">
              <FaShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
      <Toolbar style={{ backgroundColor: '#752A78', minHeight: '25px', justifyContent: 'center' }}>
        <div className="flex space-x-8">
          <Button variant="text" sx={{ color: 'white' }}>
            HOME
          </Button>
          <Button variant="text" sx={{ color: 'white' }}>
            NEW ARRIVALS
          </Button>
          <div className={classes.categoriesDropdown}>
            <Button
              variant="text"
              sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
              onClick={handleOpenMenu}
            >
              CATEGORIES <FaCaretDown />
            </Button>
            <Menu
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
              anchorEl={null}
              open={isDropdownOpen}
              onClose={handleCloseMenu}
              className={classes.dropdownMenu}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <MenuItem onClick={handleCloseMenu}>
                <ListItemText primary="Category 1" />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <ListItemText primary="Category 2" />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <ListItemText primary="Category 3" />
              </MenuItem>
            </Menu>
          </div>
          <Button variant="text" sx={{ color: 'white' }}>
            CONTACT US
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
