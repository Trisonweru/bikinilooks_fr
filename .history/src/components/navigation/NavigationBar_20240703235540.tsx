// components/Navbar.tsx
"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, Button, IconButton, Badge, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <InputBase
            placeholder="Search..."
            sx={{ mr: 1, ml: 1, width: '300px', backgroundColor: 'white', borderRadius: '5px', paddingLeft: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', transform: 'scale(1)' }}>Logo</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="text" onClick={() => alert('Login button clicked')}>
            Login
          </Button>
          <IconButton onClick={() => alert('Cart button clicked')}>
            <Badge badgeContent={3} color="error">
              <FaShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
      <Toolbar style={{ backgroundColor: '#752A78', minHeight: '40px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            HOME
          </Button>
          <Button variant="text" sx={{ color: 'white' }}>
            NEW ARRIVALS
          </Button>
          <Button
            variant="text"
            sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
            onClick={handleOpenMenu}
          >
            CATEGORIES <FaCaretDown />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            getContentAnchorEl={null}
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
          <Button variant="text" sx={{ color: 'white' }}>
            CONTACT US
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
