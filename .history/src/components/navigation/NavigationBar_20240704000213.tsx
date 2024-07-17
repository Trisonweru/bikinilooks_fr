"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Navbar = () => {
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

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    width: '80%',
    top: 0,
    zIndex: 50,
    transition: 'all 0.3s',
    '&.scrolled': {
      height: '70px',
    },
  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
  }));

  const StyledLogo = styled(Typography)(({ theme }) => ({
    fontSize: '1.75rem',
    fontWeight: 'bold',
    transition: 'transform 0.3s',
    '&.scrolled': {
      transform: 'scale(0.75)',
    },
  }));

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen(true);
  };

  const handleCloseMenu = () => {
    setIsDropdownOpen(false);
  };

  return (
    <StyledAppBar position="fixed" className={`${isScrolled ? 'scrolled' : ''}`}>
      <StyledToolbar>
        <div>
          <InputBase
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <StyledLogo variant="h6" className={`${isScrolled ? 'scrolled' : ''}`}>
            Logo
          </StyledLogo>
        </div>
        <div>
          <Button onClick={() => alert('Login button clicked')} className="border-r pr-4 border-gray-300">Login</Button>
          <IconButton onClick={() => alert('Cart button clicked')}>
            <Badge badgeContent={3} color="error">
              <FaShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </StyledToolbar>
      <Toolbar style={{ backgroundColor: '#752A78', minHeight: '25px', justifyContent: 'center' }}>
        <div className="flex space-x-8">
          <Button variant="text" sx={{ color: 'white' }}>
            HOME
          </Button>
          <Button variant="text" sx={{ color: 'white' }}>
            NEW ARRIVALS
          </Button>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
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
              
              className={{ paper: { backgroundColor: '#fff', boxShadow: '0px 8px 10px 1px rgba(0,0,0,0.14)' } }}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <MenuItem onClick={handleCloseMenu}>
                Category 1
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                Category 2
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                Category 3
              </MenuItem>
            </Menu>
          </div>
          <Button variant="text" sx={{ color: 'white' }}>
            CONTACT US
          </Button>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
