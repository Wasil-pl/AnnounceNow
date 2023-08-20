import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUserRequest } from '../../../redux/UserRedux';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUserRequest());
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
