import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../UserForm.js/UserForm';
import { getUserErrorState, getUserLoadingState, getUserLoggedState, loginUserRequest } from '../../../redux/UserRedux';

import Loader from '../Loader/Loader';
import ErrorLoad from '../ErrorLoad/ErrorLoad';
import Success from '../Success/Success';

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
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {logged && <Success successMsg={successMsg} />}
      <UserForm action={handleSubmit} actionText="Login" />
    </span>
  );
};
export default Login;
