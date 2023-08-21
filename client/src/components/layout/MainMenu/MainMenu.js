import React, { useState } from 'react';
import { AppBar, Avatar, Menu, MenuItem, Toolbar, ListItemIcon, Divider, Button } from '@mui/material';
import { PersonAdd, Logout, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { menuPaperProps } from './MenuSettings';
import styles from './MainMenu.module.scss';
import { AVATARS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUserAvatar, getUserLoggedState } from '../../../redux/UserRedux';

const MainMenu = () => {
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const logged = useSelector(getUserLoggedState);
  const avatar = useSelector(getUserAvatar);
  const userFromLocalStorage = sessionStorage.getItem('loginUser');
  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : false;

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
            {!!logged && (
              <Button color="inherit" component={Link} to="/ad/add">
                {' '}
                Add Announcment{' '}
              </Button>
            )}
          </div>
          <Avatar
            className={styles.avatar}
            src={avatar ? AVATARS_URL + avatar : AVATARS_URL + user.avatar}
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
        {!!logged && (
          <span>
            <MenuItem>
              <ListItemIcon>
                <Avatar src={avatar ? AVATARS_URL + avatar : AVATARS_URL + user.avatar} alt={'A'} />
                <Link to="/user" onClick={handleClose}>
                  My account
                </Link>
              </ListItemIcon>
            </MenuItem>
            <Divider />
          </span>
        )}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Link to="/register" onClick={handleClose}>
            Add another account
          </Link>
        </MenuItem>
        {!!logged && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>

            <Link to="/logout" onClick={handleClose}>
              Logout
            </Link>
          </MenuItem>
        )}
        {!logged && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>

            <Link to="/login" onClick={handleClose}>
              Login
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MainMenu;
