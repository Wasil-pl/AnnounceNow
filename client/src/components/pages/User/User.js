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
  const errorBox = useSelector(getErrorState);

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

        {isLoading && !errorBox && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {!isLoading && user && <MyAccountData user={user} />}
    </Container>
  );
};

export default User;
