import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, getUserRequest } from '../../../redux/UserRedux';
import { Container } from '@mui/material';

import { getErrorState, getLoadingState } from '../../../redux/adsRedux';
import ErrorLoad from '../../features/ErrorLoad/ErrorLoad';
import Loader from '../../features/Loader/Loader';
import MyAccountForm from '../../features/MyAccountForm/MyAccountForm';

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
      {!isLoading && user && <MyAccountForm user={user} />}
    </Container>
  );
};

export default User;
