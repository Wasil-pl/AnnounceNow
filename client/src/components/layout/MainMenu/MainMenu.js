import React, { useState } from 'react';
import { AppBar, Avatar, Menu, MenuItem, Toolbar, ListItemIcon, Divider, Button } from '@mui/material';
import { PersonAdd, Logout, Login } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { menuPaperProps } from './MenuSettings';
import styles from './MainMenu.module.scss';
import { AVATARS_URL } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAvatar, getUserLoggedState, logoutUserRequest } from '../../../redux/UserRedux';

const MainMenu = () => {
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logoutUserRequest());
    setAvatarAnchorEl(null);
    navigate('/');
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
            <MenuItem onClick={handleClose} component={Link} to="/user">
              <ListItemIcon>
                <Avatar src={avatar ? AVATARS_URL + avatar : AVATARS_URL + user.avatar} alt={'A'} />
                My account
              </ListItemIcon>
            </MenuItem>
            <Divider />
          </span>
        )}

        <MenuItem onClick={handleClose} component={Link} to="/register">
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        {!!logged && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}

        {!logged && (
          <MenuItem onClick={handleClose} component={Link} to="/login">
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MainMenu;
