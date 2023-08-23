import { useDispatch, useSelector } from 'react-redux';
import AddEditForm from '../../features/AddEditForm/AdEditForm';
import { addAdRequest, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { useState } from 'react';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../consts';

const AddAnnouncment = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  const handleSubmit = (formData) => {
    dispatch(addAdRequest(formData));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 400,
        }}
        spacing={1}
      >
        {errorBox && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorBox}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorBox && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.add}</strong>
          </Alert>
        )}

        {isLoading && !errorBox && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {!isLoading && !errorBox && !success && (
        <AddEditForm action={handleSubmit} actionText="Add Post" pageTitle="Add Post" />
      )}
    </Container>
  );
};

export default AddAnnouncment;
