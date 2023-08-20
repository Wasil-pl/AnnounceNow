import { useDispatch } from 'react-redux';
import { loadAdsRequest } from '../../../redux/adsRedux';
import Announcments from '../../features/Announcments/Announcments';
import { useEffect } from 'react';
import SearchPhrase from '../../features/SearchPhrase/SearchPhrase';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <div>
      <SearchPhrase />
      <Announcments />
    </div>
  );
};

export default HomePage;
