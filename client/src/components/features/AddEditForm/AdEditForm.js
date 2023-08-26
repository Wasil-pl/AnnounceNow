import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Chip, Input, Box, CssBaseline, Avatar } from '@mui/material';
import styles from './AdEditForm.module.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useForm } from 'react-hook-form';
import { errorMessages, patterns, Error } from '../../../consts';
import { IMAGES_URL } from '../../../config';
import { removeLastNumberSegment } from '../../../Utils/removeLastNumberSegment';

const AdEditForm = ({ pageTitle, action, actionText, defaultValues, ...props }) => {
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const date = props.date || new Date().toISOString().slice(0, 10);

  const handleChipDelete = () => {
    setSelectedFileName('');
    setFile(null);
  };

  const onSubmitCallback = (data) => {
    const formData = new FormData();

    if (!file) return setFileError(errorMessages.requiredFile);
    if (!patterns.acceptedFileTypes.includes(file.type)) return setFileError(errorMessages.validateFile);

    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('price', data.price);
    formData.append('address', data.address);
    formData.append('picture', file);
    formData.append('date', date);
    action(formData);
  };

  useEffect(() => {
    if (!defaultValues) return;

    const getImage = async () => {
      await fetch(IMAGES_URL + defaultValues.picture)
        .then((data) => data.blob())
        .then((parsedData) => {
          const oryginalFileName = removeLastNumberSegment(defaultValues.picture);

          const file = new File([parsedData], oryginalFileName, { type: parsedData.type });

          setFile(file);
          setSelectedFileName(oryginalFileName);

          // const fileList = new FileList();
          // fileList[0] = file;

          // setValue('file', [file]);

          // ========= pobieranie pliku =========
          // const imageBase64 = URL.createObjectURL(parsedData);
          // const a = document.createElement('a');
          // a.style.setProperty('display', 'none');
          // document.body.appendChild(a);
          // // a.download = url.replace(/^.*[\\\/]/, '')
          // a.setAttribute('download', true);
          // a.href = imageBase64;
          // a.click();
          // a.remove();

          // LUB (może być blokowane):
          // window.open(imageBase64);
        });
    };
    getImage();
  }, [defaultValues]);

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box className={styles.container}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pageTitle}
        </Typography>
        <form className={styles.formBox} onSubmit={handleSubmit(onSubmitCallback)}>
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
                <Button className={styles.pictureBtn} component="label" variant="contained">
                  Add Picture
                  <Input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setSelectedFileName(e.target.files[0].name);
                    }}
                    type="file"
                    sx={{ display: 'none' }}
                  />
                </Button>
                {errors.file && <Error>{errors.file.message}</Error>}
                {selectedFileName && (
                  <Chip className={styles.chip} label={selectedFileName} color="primary" onDelete={handleChipDelete} />
                )}
                {fileError && <Error>{fileError}</Error>}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('price', {
                  required: errorMessages.required,
                  pattern: { value: patterns.validatePrice, message: errorMessages.validatePrice },
                })}
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
