import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../UserForm/UserForm';
import { addUserRequest, getUserErrorState, getUserLoadingState } from '../../../redux/UserRedux';

import ErrorLoad from '../ErrorLoad/ErrorLoad';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import Success from '../Success/Success';

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
      {!isLoading && !errorBox && !success && <UserForm action={handleSubmit} actionText="Sign in" registerUser />}
    </span>
  );
};

export default Register;
