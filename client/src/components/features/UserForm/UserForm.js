import { Avatar, Box, Button, Chip, Container, CssBaseline, Input, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import styles from './UserForm.module.scss';
import { useForm } from 'react-hook-form';
import { Error, errorMessages, patterns } from '../ErrorMessages/ErrorMessages';

const UserForm = ({ action, actionText, registerUser }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileError, setFileError] = useState(null);
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
    const file = event.target.files[0];
    if (file) setSelectedFileName(file.name);
  };

  const handleChipDelete = () => {
    setAvatar(null);
    setSelectedFileName('');
  };

  const handleSubmit = () => {
    if (registerUser) {
      if (!patterns.acceptedFileTypes.includes(avatar.type)) {
        setFileError(true);
        return;
      }

      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('login', login);
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);

      return action(formData);
    }
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
          {actionText}
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
          {registerUser && (
            <TextField
              {...register('phoneNumber', {
                required: errorMessages.required,
                pattern: { value: patterns.validatePhoneNumber, message: errorMessages.validatePhoneNumber },
              })}
              onChange={(event) => setPhoneNumber(event.target.value)}
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
          )}
          {registerUser && (
            <div className={styles.avatarContainer}>
              <Button component="label" variant="contained" sx={{ mt: 3 }}>
                Add Avatar
                <Input
                  {...register('file', {
                    required: errorMessages.requiredFile,
                  })}
                  type="file"
                  required
                  onChange={handleFileChange}
                  sx={{ display: 'none' }}
                />
              </Button>
              {errors.file && <Error>{errors.file.message}</Error>}
              {fileError && <Error>{errorMessages.validateFile}</Error>}
              {selectedFileName && (
                <Chip
                  sx={{ mt: 1, marginLeft: 2 }}
                  label={selectedFileName}
                  color="primary"
                  onDelete={handleChipDelete}
                />
              )}
            </div>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {actionText}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;
