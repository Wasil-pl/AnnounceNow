import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../UserForm.js/UserForm';
import { addUserRequest } from '../../../redux/UserRedux';
import { getErrorState, getLoadingState } from '../../../redux/adsRedux';
import ErrorLoad from '../../ErrorLoad/ErrorLoad';
import Loader from '../Loader/Loader';

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

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
