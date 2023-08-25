import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteAdRequest,
  getAdById,
  getErrorState,
  getLoadingState,
  loadAdByIdRequest,
} from '../../../../redux/adsRedux';
import { Container, Stack } from '@mui/material';
import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import DeleteConfirm from './DeleteConfirm';
import { successMessages } from '../../../../consts';

export const DeleteAd = () => {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoadingState);
  const errorMessages = useSelector(getErrorState);

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const ad = useSelector(getAdById);

  const handleSubmit = (deletedId) => {
    dispatch(deleteAdRequest(deletedId));

    if (!errorMessages) {
      setSuccess(true);
    }
  };

  if (!ad) return <div> No data </div>;

  return (
    <Container>
      <Stack className="stackAlerts" spacing={1}>
        {errorMessages && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMessages}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorMessages && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.delete}</strong>
          </Alert>
        )}

        {isLoading && !errorMessages && (
          <Box className="circularProgress">
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !errorMessages && !success && <DeleteConfirm action={handleSubmit} deleteItem={ad} />}
    </Container>
  );
};
