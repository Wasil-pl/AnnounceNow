import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAdRequest, getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import AddEditForm from '../../features/AddEditForm/AdEditForm';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader';
import ErrorLoad from '../../common/ErrorLoad/ErrorLoad';
import Success from '../../common/Success/Success';

const EditAnnouncment = () => {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const handleSubmit = (formData) => {
    dispatch(editAdRequest(formData, id));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  const adData = useSelector(getAdById);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  if (!adData) return <div> No data </div>;

  const successMsg = 'Post edited successfully';

  return (
    <span>
      {errorBox && <ErrorLoad errorMsg={errorBox} />}
      {isLoading && !errorBox && <Loader />}
      {success && !isLoading && !errorBox && <Success successMsg={successMsg} />}
      {!isLoading && !errorBox && !success && (
        <AddEditForm
          action={handleSubmit}
          actionText="Edit Post"
          pageTitle="Edit Post"
          title={adData.title}
          content={adData.content}
          price={adData.price}
          date={adData.date}
          address={adData.address}
          picture={adData.picture}
        />
      )}
    </span>
  );
};

export default EditAnnouncment;
