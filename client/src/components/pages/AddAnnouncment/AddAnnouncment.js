import { useDispatch, useSelector } from 'react-redux';
import AddEditForm from '../../features/AddEditForm/AddEditForm';
import { addAdRequest, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import ErrorLoad from '../../features/ErrorLoad/ErrorLoad';
import Loader from '../../features/Loader/Loader';
import { useState } from 'react';
import Success from '../../features/Success/Success';

const AddAnnouncment = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  const handleSubmit = (formData) => {
    dispatch(addAdRequest(formData));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  const successMsg = 'Post added successfully';

  return (
    <div>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {success && !isLoading && !errorBox && <Success successMsg={successMsg} />}
      {!isLoading && !errorBox && !success && (
        <AddEditForm action={handleSubmit} actionText="Add Post" pageTitle="Add Post" />
      )}
    </div>
  );
};

export default AddAnnouncment;
