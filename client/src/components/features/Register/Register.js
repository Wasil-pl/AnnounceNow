import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../UserForm.js/UserForm';
import { addUserRequest, getUserErrorState, getUserLoadingState } from '../../../redux/UserRedux';

import ErrorLoad from '../ErrorLoad/ErrorLoad';
import Loader from '../Loader/Loader';

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoadingState);
  const errorBox = useSelector(getUserErrorState);

  const handleSubmit = ({ login, password, phoneNumber, avatar }) => {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('avatar', avatar);

    dispatch(addUserRequest(formData));
  };

  return (
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      <UserForm action={handleSubmit} actionText="Sign in" register />
    </span>
  );
};

export default Register;
