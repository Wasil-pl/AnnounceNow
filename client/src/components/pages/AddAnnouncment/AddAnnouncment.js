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
  const errorMessages = useSelector(getErrorState);

  const handleSubmit = (formData) => {
    dispatch(addAdRequest(formData));

    if (!errorMessages) {
      setSuccess(true);
    }
  };

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessages && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessages}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorMessages && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.add}</strong>
          </Alert>
        )}

        {isLoading && !errorMessages && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {!isLoading && !errorMessages && !success && (
        <AddEditForm action={handleSubmit} actionText="Add Post" pageTitle="Add Post" />
      )}
    </Container>
  );
};

export default AddAnnouncment;
