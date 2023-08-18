import React, { useState } from 'react';
import { AppBar, Avatar, Menu, MenuItem, Toolbar, ListItemIcon, Divider, Button } from '@mui/material';
import { PersonAdd, Logout, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { menuPaperProps } from './MenuSettings';
import styles from './MainMenu.module.scss';
import { AVATARS_URL } from '../../../config';

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
          <Avatar
            className={styles.avatar}
            src={AVATARS_URL}
            alt={'L'}
            sx={{ width: 32, height: 32 }}
            onClick={handleAvatarClick}
          />
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
            <Link to="/user" onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <Link to="/login" onClick={handleClose}>
            Login
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
