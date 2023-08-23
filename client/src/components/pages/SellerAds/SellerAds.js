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

      {!isLoading && !errorBox && <AdThumb data={adData} />}
    </Container>
  );
};

export default SellerAds;
