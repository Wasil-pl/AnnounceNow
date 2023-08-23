import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { errorMessages } from '../../../consts';

const LoginForm = ({ action }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    action({ login, password });
  };

  return (
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
          Login
        </Typography>
        <Box component="form" onSubmit={validate(handleSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register('login', {
              required: errorMessages.required,
            })}
            onChange={(event) => setLogin(event.target.value)}
            margin="normal"
            required
            fullWidth
            id="login"
            label="login"
            name="login"
            autoComplete="login"
            autoFocus
            error={!!errors.login}
            helperText={errors.login?.message}
          />
          <TextField
            {...register('password', {
              required: errorMessages.required,
            })}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
