import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getErrorState, getLoadingState, getSearchResult, searchAdRequest } from '../../../redux/adsRedux';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import AdThumb from '../../features/AdThumb/AdThumb';

const SearchResult = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const adsData = useSelector(getSearchResult);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  useEffect(() => {
    dispatch(searchAdRequest(searchPhrase));
  }, [dispatch, searchPhrase]);

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

      {!isLoading && <AdThumb data={adsData} />}
    </Container>
  );
};

export default SearchResult;
