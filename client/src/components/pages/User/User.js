import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, getUserRequest } from '../../../redux/UserRedux';
import { Container } from '@mui/material';

import { getErrorState, getLoadingState } from '../../../redux/adsRedux';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Loader from '../../common/Loader/Loader';
import MyAccountData from '../../features/MyAccountData/MyAccountData';

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  const user = useSelector(getUserData);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  return (
    <Container>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {!isLoading && user && <MyAccountData user={user} />}
    </Container>
  );
};

export default User;
