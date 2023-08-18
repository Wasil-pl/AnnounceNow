import { useDispatch } from 'react-redux';
import { loadAdsRequest } from '../../../redux/adsRedux';
import Announcments from '../../features/Announcments/Announcments';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <div>
      <div>search</div>
      <Announcments />
    </div>
  );
};

export default HomePage;
