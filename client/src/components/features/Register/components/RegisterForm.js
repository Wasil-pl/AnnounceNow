import { Avatar, Box, Button, Chip, Container, CssBaseline, Input, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { errorMessages, patterns, Error } from '../../../../consts';

const RegisterForm = ({ action }) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChipDelete = () => {
    setSelectedFileName('');
    setValue('file', null);
  };

  const onSubmitCallback = (data) => {
    const formData = new FormData();
    formData.append('login', data.login);
    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('avatar', data.file[0]);

    return action(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={styles.container}>
        <Avatar className={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box className={styles.formBox} component="form" onSubmit={handleSubmit(onSubmitCallback)} noValidate>
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

          <TextField
            {...register('phoneNumber', {
              required: errorMessages.required,
              pattern: { value: patterns.validatePhoneNumber, message: errorMessages.validatePhoneNumber },
            })}
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            type="number"
            autoComplete="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <div className={styles.addAvatarContainer}>
            <Button className={styles.avatarButton} component="label" variant="contained">
              Add Avatar
              <Input
                {...register('file', {
                  onChange: (e) => {
                    setSelectedFileName(e.target.files[0].name ?? '');
                  },
                  required: errorMessages.requiredFile,
                  validate: {
                    value: (file) => {
                      return patterns.acceptedFileTypes.includes(file[0].type) || errorMessages.validateFile;
                    },
                  },
                })}
                type="file"
                required
              />
            </Button>
            {errors.file && <Error>{errors.file.message}</Error>}
            {selectedFileName && (
              <Chip className={styles.chip} label={selectedFileName} color="primary" onDelete={handleChipDelete} />
            )}
          </div>

          <Button className={styles.submitBtn} type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
