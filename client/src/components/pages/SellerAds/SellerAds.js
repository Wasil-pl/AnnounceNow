import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getErrorState, getLoadingState, getUserAds, userAdsRequest } from '../../../redux/adsRedux';
import AdThumb from '../../features/AdThumb/AdThumb';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';

const SellerAds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAdsRequest(id));
  }, [dispatch, id]);

  const adData = useSelector(getUserAds);
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

      {!isLoading && !errorMessage && <AdThumb data={adData} />}
    </Container>
  );
};

export default SellerAds;
