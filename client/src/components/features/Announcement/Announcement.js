import { useParams } from 'react-router-dom';
import { getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AnnouncmentForm from '../AnnouncmentForm/AnnouncmentForm';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';

const Announcment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const adData = useSelector(getAdById);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  if (!adData) return <div> No data </div>;

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
      {!isLoading && !errorBox && <AnnouncmentForm data={adData} />}
    </Container>
  );
};

export default Announcment;
