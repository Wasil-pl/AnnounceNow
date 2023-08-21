import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Chip, Input, Box, CssBaseline, Avatar } from '@mui/material';
import styles from './AddEditForm.module.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const AddEditForm = ({ pageTitle, action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [Content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [address, setAddress] = useState(props.address || '');
  const [picture, setPicture] = useState(props.picture || null);
  const [selectedFileName, setSelectedFileName] = useState(props.picture || '');
  const date = new Date().toISOString().slice(0, 10);

  const handleFileChange = (event) => {
    setPicture(event.target.files[0]);
    const file = event.target.files[0];
    if (file) setSelectedFileName(file.name);
  };

  const handleChipDelete = () => {
    setPicture(null);
    setSelectedFileName('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="content"
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                onChange={(event) => setContent(event.target.value)}
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
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    onChange={handleFileChange}
                    sx={{ display: 'none' }}
                  />
                </Button>
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
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                onChange={(event) => setAddress(event.target.value)}
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