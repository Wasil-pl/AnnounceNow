import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Chip, Input, Box, CssBaseline, Avatar } from '@mui/material';
import styles from './AdEditForm.module.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useForm } from 'react-hook-form';
import { errorMessages, patterns, Error } from '../../../consts';

const AdEditForm = ({ pageTitle, action, actionText, ...props }) => {
  const [selectedFileName, setSelectedFileName] = useState(props.picture || '');
  const date = props.date || new Date().toISOString().slice(0, 10);
  const {
    register,
    handleSubmit: validate,
    watch,
    setValue,
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

  useEffect(() => {
    if (Object.keys(props).length === 0) return;

    setValue('title', props.title || '');
    setValue('content', props.content || '');
    setValue('price', props.price || '');
    setValue('address', props.address || '');
  }, [setValue]);

  const handleChipDelete = () => {
    setSelectedFileName('');
    inputsData.file = '';
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', inputsData.title);
    formData.append('content', inputsData.content);
    formData.append('price', inputsData.price);
    formData.append('address', inputsData.address);
    formData.append('picture', inputsData.file[0]);
    formData.append('date', date);
    action(formData);
  };

  return (
    <Container maxWidth="sm">
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
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pageTitle}
        </Typography>
        <form onSubmit={validate(handleSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('title', {
                  required: errorMessages.required,
                  maxLength: {
                    value: patterns.titleMaxLength,
                    message: errorMessages.maxLength(patterns.titleMaxLength),
                  },
                  pattern: { value: patterns.textPattern, message: errorMessages.textPattern },
                })}
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('content', {
                  required: errorMessages.required,
                  maxLength: {
                    value: patterns.contentMaxLength,
                    message: errorMessages.maxLength(patterns.contentMaxLength),
                  },
                  pattern: { value: patterns.textPattern, message: errorMessages.textPattern },
                })}
                name="content"
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="date" label="date" disabled variant="outlined" fullWidth value={date} />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.avatarContainer}>
                <Button className={styles.pictureBtn} component="label" variant="contained" sx={{ mt: 3 }}>
                  Add Picture
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
                    sx={{ display: 'none' }}
                  />
                </Button>
                {errors.file && <Error>{errors.file.message}</Error>}
                {selectedFileName && (
                  <Chip
                    className={styles.chip}
                    sx={{ mt: 1, marginLeft: 2 }}
                    label={selectedFileName}
                    color="primary"
                    onDelete={handleChipDelete}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('price', {
                  required: errorMessages.required,
                  pattern: { value: patterns.validatePrice, message: errorMessages.validatePrice },
                })}
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('address', {
                  required: errorMessages.required,
                  pattern: { value: patterns.textPattern, message: errorMessages.textPattern },
                })}
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {actionText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdEditForm;
