import { useSelector } from 'react-redux';
import AdThumb from '../AdThumb/AdThumb';
import { getAllData, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';

const Announcments = () => {
  const adsData = useSelector(getAllData);
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
      {!isLoading && !errorBox && <AdThumb data={adsData} />}
    </Container>
  );
};
export default Announcments;
