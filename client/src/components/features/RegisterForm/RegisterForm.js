import { Avatar, Box, Button, Chip, Container, CssBaseline, Input, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { Error, errorMessages, patterns } from '../../../consts';

const RegisterForm = ({ action }) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const {
    register,
    handleSubmit: validate,
    watch,
    formState: { errors },
  } = useForm();

  const inputsData = watch();

  useEffect(() => {
    if (Object.keys(inputsData).length === 0) return;

    const file = inputsData.file[0];

    if (file) {
      setSelectedFileName(inputsData.file[0].name);
    }
  }, [inputsData.file]);

  const handleChipDelete = () => {
    setSelectedFileName('');
    inputsData.file = '';
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('login', inputsData.login);
    formData.append('password', inputsData.password);
    formData.append('phoneNumber', inputsData.phoneNumber);
    formData.append('avatar', inputsData.file[0]);

    return action(formData);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={validate(handleSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register('login', {
              required: errorMessages.required,
            })}
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

          <TextField
            {...register('phoneNumber', {
              required: errorMessages.required,
              pattern: { value: patterns.validatePhoneNumber, message: errorMessages.validatePhoneNumber },
            })}
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="number"
            id="phoneNumber"
            autoComplete="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <div className={styles.avatarContainer}>
            <Button component="label" variant="contained" sx={{ mt: 3 }}>
              Add Avatar
              <Input
                {...register('file', {
                  required: errorMessages.requiredFile,
                  validate: {
                    value: (file) => {
                      return patterns.acceptedFileTypes.includes(file[0].type) || errorMessages.validateFile;
                    },
                  },
                })}
                type="file"
                required
                sx={{ display: 'none' }}
              />
            </Button>
            {errors.file && <Error>{errors.file.message}</Error>}
            {selectedFileName && (
              <Chip
                sx={{ mt: 1, marginLeft: 2 }}
                label={selectedFileName}
                color="primary"
                onDelete={handleChipDelete}
              />
            )}
          </div>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
