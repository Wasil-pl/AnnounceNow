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
  const errorMessages = useSelector(getErrorState);

  if (!adData) return <div> No data </div>;

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessages && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessages}</strong>
          </Alert>
        )}

        {isLoading && !errorMessages && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>
      {!isLoading && !errorMessages && <AnnouncmentForm data={adData} />}
    </Container>
  );
};

export default Announcment;
