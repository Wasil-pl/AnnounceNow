import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Input,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import styles from './UserForm.module.scss';

const UserForm = ({ action, actionText, register }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    action({ login, password, phoneNumber, avatar });
  };

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {actionText}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(event) => setLogin(event.target.value)}
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {register && (
              <TextField
                onChange={(event) => setPhoneNumber(event.target.value)}
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="number"
                id="phoneNumber"
              />
            )}
            {register && (
              <div className={styles.avatarContainer}>
                <Button component="label" variant="contained" sx={{ mt: 3 }}>
                  Add Avatar
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    onChange={handleFileChange}
                    sx={{ display: 'none' }}
                  />
                </Button>
                {selectedFileName && (
                  <Typography sx={{ mt: 1 }} variant="body2">
                    {selectedFileName}
                  </Typography>
                )}
              </div>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {actionText}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
