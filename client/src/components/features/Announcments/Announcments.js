import { useSelector } from 'react-redux';
import AdThumb from '../AdThumb/AdThumb';
import { getAllData, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';

const Announcments = () => {
  const adsData = useSelector(getAllData);
  const isLoading = useSelector(getLoadingState);
  const errorMessages = useSelector(getErrorState);

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
      {!isLoading && !errorMessages && <AdThumb data={adsData} />}
    </Container>
  );
};
export default Announcments;
