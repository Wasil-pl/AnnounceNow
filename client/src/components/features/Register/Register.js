import { useDispatch, useSelector } from 'react-redux';
import { addUserRequest, getUserErrorState, getUserLoadingState } from '../../../redux/UserRedux';
import { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../consts';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoadingState);
  const errorBox = useSelector(getUserErrorState);

  const handleSubmit = (formData) => {
    dispatch(addUserRequest(formData));

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
            <strong>{successMessages.register}</strong>
          </Alert>
        )}

        {isLoading && !errorBox && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !errorBox && !success && <RegisterForm action={handleSubmit} />}
    </Container>
  );
};

export default Register;
