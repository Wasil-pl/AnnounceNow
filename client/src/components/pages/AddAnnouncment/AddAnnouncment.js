import { useDispatch, useSelector } from 'react-redux';
import AddEditForm from '../../features/AddEditForm/AddEditForm';
import { addAdRequest, getErrorState, getLoadingState, getSuccessState } from '../../../redux/adsRedux';
import ErrorLoad from '../../features/ErrorLoad/ErrorLoad';
import Loader from '../../features/Loader/Loader';

const AddAnnouncment = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);
  const success = useSelector(getSuccessState);
  console.log('success:', success);

  const handleSubmit = (formData) => {
    dispatch(addAdRequest(formData));
  };

  return (
    <div>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      <AddEditForm action={handleSubmit} actionText="Add Post" pageTitle="Add Post" />
    </div>
  );
};

export default AddAnnouncment;
