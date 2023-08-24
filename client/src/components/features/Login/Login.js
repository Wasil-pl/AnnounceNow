import { useDispatch, useSelector } from 'react-redux';
import { getUserErrorState, getUserLoadingState, getUserLoggedState, loginUserRequest } from '../../../redux/UserRedux';
import LoginForm from '../LoginForm/LoginForm';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../consts';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (user) => {
    dispatch(loginUserRequest(user));
  };

  const isLoading = useSelector(getUserLoadingState);
  const errorBox = useSelector(getUserErrorState);
  const logged = useSelector(getUserLoggedState);

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

        {logged && !isLoading && !errorBox && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.login}</strong>
          </Alert>
        )}

        {isLoading && !errorBox && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !logged && <LoginForm action={handleSubmit} actionText="Login" />}
    </Container>
  );
};
export default Login;
