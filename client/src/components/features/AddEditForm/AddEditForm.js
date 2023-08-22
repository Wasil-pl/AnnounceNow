import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Chip, Input, Box, CssBaseline, Avatar } from '@mui/material';
import styles from './AddEditForm.module.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useForm } from 'react-hook-form';
import { Error, errorMessages, patterns } from '../ErrorMessages/ErrorMessages';

const AddEditForm = ({ pageTitle, action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [Content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [address, setAddress] = useState(props.address || '');
  const [picture, setPicture] = useState(props.picture || null);
  const [selectedFileName, setSelectedFileName] = useState(props.picture || '');
  const date = props.date || new Date().toISOString().slice(0, 10);
  const [fileError, setFileError] = useState(null);
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPicture(event.target.files[0]);
    if (file) setSelectedFileName(file.name);
  };

  const handleChipDelete = () => {
    setPicture(null);
    setSelectedFileName('');
  };

  const handleSubmit = () => {
    if (!patterns.acceptedFileTypes.includes(picture.type)) {
      setFileError(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', Content);
    formData.append('price', price);
    formData.append('address', address);
    formData.append('picture', picture);
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
                value={title}
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                onChange={(event) => setTitle(event.target.value)}
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
                value={Content}
                fullWidth
                multiline
                rows={4}
                onChange={(event) => setContent(event.target.value)}
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
                    })}
                    type="file"
                    accept={patterns.acceptedFileTypes.join(',')}
                    onChange={handleFileChange}
                    sx={{ display: 'none' }}
                  />
                </Button>
                {errors.file && <Error>{errors.file.message}</Error>}
                {fileError && <Error>{errorMessages.validateFile}</Error>}
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
                value={price}
                fullWidth
                onChange={(event) => setPrice(event.target.value)}
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
                value={address}
                fullWidth
                onChange={(event) => setAddress(event.target.value)}
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

export default AddEditForm;
