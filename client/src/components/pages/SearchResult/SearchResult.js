import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getErrorState, getLoadingState, getSearchResult, searchAdRequest } from '../../../redux/adsRedux';
import { Container } from '@mui/material';
import ErrorLoad from '../../features/ErrorLoad/ErrorLoad';
import AdThumb from '../../features/AdThumb/AdThumb';
import Loader from '../../features/Loader/Loader';

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
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && <AdThumb data={adsData} />}
    </Container>
  );
};

export default SearchResult;
