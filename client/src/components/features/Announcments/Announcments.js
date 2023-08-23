import { useSelector } from 'react-redux';
import AdThumb from '../AdThumb/AdThumb';
import { getAllData, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { Container } from '@mui/material';
import Loader from '../../common/Loader/Loader';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';

const Announcments = () => {
  const adsData = useSelector(getAllData);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  return (
    <Container>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && !errorBox && <AdThumb data={adsData} />}
    </Container>
  );
};
export default Announcments;
