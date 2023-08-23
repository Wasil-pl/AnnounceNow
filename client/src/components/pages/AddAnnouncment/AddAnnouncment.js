import { useDispatch, useSelector } from 'react-redux';
import AddEditForm from '../../features/AddEditForm/AdEditForm';
import { addAdRequest, getErrorState, getLoadingState } from '../../../redux/adsRedux';
import { useState } from 'react';
import Loader from '../../common/Loader/Loader';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Success from '../../common/Success/Success';

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
