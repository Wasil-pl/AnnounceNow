import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getErrorState, getLoadingState, getUserAds, userAdsRequest } from '../../../redux/adsRedux';
import ErrorLoad from '../../features/ErrorLoad/ErrorLoad';
import Loader from '../../features/Loader/Loader';
import AdThumb from '../../features/AdThumb/AdThumb';

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
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && !errorBox && <AdThumb data={adData} />}
    </span>
  );
};

export default SellerAds;
