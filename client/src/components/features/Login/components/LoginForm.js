import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { errorMessages } from '../../../../consts';
import styles from './LoginForm.module.scss';

const LoginForm = ({ action }) => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = (data) => {
    action(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={styles.container}>
        <Avatar className={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={validate(handleSubmit)} noValidate className={styles.formBox}>
          <TextField
            {...register('login', {
              required: errorMessages.required,
            })}
            margin="normal"
            required
            fullWidth
            label="login"
            autoComplete="login"
            autoFocus
            error={!!errors.login}
            helperText={errors.login?.message}
          />
          <TextField
            {...register('password', {
              required: errorMessages.required,
            })}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button className={styles.submitBtn} type="submit" fullWidth variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
