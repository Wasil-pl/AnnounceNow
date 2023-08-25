import { useDispatch, useSelector } from 'react-redux';
import { addUserRequest, getUserErrorState, getUserLoadingState } from '../../../../redux/UserRedux';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../../consts';

export const Register = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoadingState);
  const errorMessage = useSelector(getUserErrorState);

  const shouldDisplayForm = !isLoading && !errorMessage && !success;

  const handleSubmit = async (formData) => {
    await dispatch(addUserRequest(formData));

    if (!errorMessage) {
      setSuccess(true);
    }
  };

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessage && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessage}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorMessage && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.register}</strong>
          </Alert>
        )}

        {isLoading && !errorMessage && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {shouldDisplayForm && <RegisterForm action={handleSubmit} />}
    </Container>
  );
};
