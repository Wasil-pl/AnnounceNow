import { useDispatch, useSelector } from 'react-redux';
import { getUserErrorState, getUserLoadingState, getUserLoggedState, loginUserRequest } from '../../../redux/UserRedux';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Loader from '../../common/Loader/Loader';
import Success from '../../common/Success/Success';
import LoginForm from '../LoginForm/LoginForm';
import { Container } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (user) => {
    dispatch(loginUserRequest(user));
  };

  const successMsg = 'You are logged in';

  const isLoading = useSelector(getUserLoadingState);
  const errorBox = useSelector(getUserErrorState);
  const logged = useSelector(getUserLoggedState);

  return (
    <Container>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {logged && <Success successMsg={successMsg} />}
      <LoginForm action={handleSubmit} actionText="Login" />
    </Container>
  );
};
export default Login;
