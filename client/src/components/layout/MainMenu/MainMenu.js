import React from 'react';

import styles from './MainMenu.module.scss';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';

const MainMenu = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="h1" className={styles.logo}>
            AnnounceNow
          </Typography>
          <nav>
            <Button>Home</Button>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainMenu;
