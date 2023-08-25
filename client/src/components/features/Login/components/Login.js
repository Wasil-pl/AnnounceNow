import { useDispatch, useSelector } from 'react-redux';
import {
  getUserErrorState,
  getUserLoadingState,
  getUserLoggedState,
  loginUserRequest,
} from '../../../../redux/UserRedux';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../../consts';
import LoginForm from './LoginForm';

export const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (user) => {
    dispatch(loginUserRequest(user));
  };

  const isLoading = useSelector(getUserLoadingState);
  const errorMessages = useSelector(getUserErrorState);
  const logged = useSelector(getUserLoggedState);

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessages && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessages}</strong>
          </Alert>
        )}

        {logged && !isLoading && !errorMessages && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.login}</strong>
          </Alert>
        )}

        {isLoading && !errorMessages && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !logged && <LoginForm action={handleSubmit} actionText="Login" />}
    </Container>
  );
};
