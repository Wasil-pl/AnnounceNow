import React, { useState } from 'react';
import { AppBar, Avatar, Menu, MenuItem, Toolbar, ListItemIcon, Divider, Button } from '@mui/material';
import { PersonAdd, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { menuPaperProps } from './MenuSettings';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAvatarAnchorEl(null);
  };

  return (
    <div className={styles.mainMenu}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <div>
            <Button color="inherit" component={Link} to="/">
              {' '}
              Home{' '}
            </Button>
            <Button color="inherit" component={Link} to="/ad/add">
              {' '}
              Add Announcment{' '}
            </Button>
          </div>
          <Avatar className={styles.avatar} sx={{ width: 32, height: 32 }} onClick={handleAvatarClick} />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={avatarAnchorEl}
        open={Boolean(avatarAnchorEl)}
        onClose={handleClose}
        PaperProps={menuPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Avatar />
            <Link to="/ad/add" onClick={handleClose}>
              My account
            </Link>
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Link to="/register" onClick={handleClose}>
            Add another account
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to="/logout" onClick={handleClose}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
