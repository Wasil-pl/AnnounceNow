import { useDispatch, useSelector } from 'react-redux';
import { addUserRequest, getUserErrorState, getUserLoadingState } from '../../../redux/UserRedux';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Loader from '../../common/Loader/Loader';
import Success from '../../common/Success/Success';
import { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoadingState);
  const errorBox = useSelector(getUserErrorState);

  const handleSubmit = (formData) => {
    dispatch(addUserRequest(formData));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  const successMsg = 'You are registered';

  return (
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {success && !isLoading && !errorBox && <Success successMsg={successMsg} />}
      {!isLoading && !errorBox && !success && <RegisterForm action={handleSubmit} />}
    </span>
  );
};

export default Register;
