import { useSelector } from 'react-redux';
import AdThumb from '../AdThumb/AdThumb';
import { getAllData, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { Container } from '@mui/material';
import Loader from '../Loader/Loader';
import ErrorLoad from '../../ErrorLoad/ErrorLoad';

const Announcments = () => {
  const adsData = useSelector(getAllData);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);
  console.log('errorBox:', errorBox);

  return (
    <Container>
      {errorBox && <ErrorLoad />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && <AdThumb data={adsData} />}
    </Container>
  );
};
export default Announcments;
