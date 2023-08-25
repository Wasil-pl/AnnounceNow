import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, getUserRequest } from '../../../redux/UserRedux';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { getErrorState, getLoadingState } from '../../../redux/adsRedux';
import MyAccountData from '../../features/MyAccountData/MyAccountData';

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  const user = useSelector(getUserData);
  const isLoading = useSelector(getLoadingState);
  const errorMessage = useSelector(getErrorState);

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessage && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessage}</strong>
          </Alert>
        )}

        {isLoading && !errorMessage && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {!isLoading && user && <MyAccountData user={user} />}
    </Container>
  );
};

export default User;
