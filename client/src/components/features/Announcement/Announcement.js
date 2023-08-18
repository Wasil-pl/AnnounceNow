import { useParams } from 'react-router-dom';
import { getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ErrorLoad from '../../ErrorLoad/ErrorLoad';
import Loader from '../Loader/Loader';

const Announcment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const adData = useSelector(getAdById);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  if (errorBox) return <ErrorLoad errorMsg={errorBox} />;
  if (isLoading && !errorBox) return <Loader />;

  return (
    <div>
      <h1>Announcment</h1>
    </div>
  );
};

export default Announcment;
