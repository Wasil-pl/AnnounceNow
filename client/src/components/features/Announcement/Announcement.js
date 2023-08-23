import { useParams } from 'react-router-dom';
import { getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AnnouncmentForm from '../AnnouncmentForm/AnnouncmentForm';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Loader from '../../common/Loader/Loader';

const Announcment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const adData = useSelector(getAdById);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  if (!adData) return <div> No data </div>;

  return (
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && !errorBox && <AnnouncmentForm data={adData} />}
    </span>
  );
};

export default Announcment;
