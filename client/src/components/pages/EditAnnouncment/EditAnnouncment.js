import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAdRequest, getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import AddEditForm from '../../features/AddEditForm/AdEditForm';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, CircularProgress, Container, Stack } from '@mui/material';
import { successMessages } from '../../../consts';

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

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorBox && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorBox}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorBox && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.edit}</strong>
          </Alert>
        )}

        {isLoading && !errorBox && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !errorBox && !success && (
        <AddEditForm
          action={handleSubmit}
          actionText="Edit Post"
          pageTitle="Edit Post"
          defaultValues={{ ...adData }}
          picture={adData.picture}
        />
      )}
    </Container>
  );
};

export default EditAnnouncment;
