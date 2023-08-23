import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAdRequest, getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { Container, Stack } from '@mui/material';
import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import { successMessages } from '../../../consts';

const DeleteAd = () => {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const ad = useSelector(getAdById);

  const handleSubmit = (deletedId) => {
    dispatch(deleteAdRequest(deletedId));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  if (!ad) return <div> No data </div>;

  return (
    <Container>
      <Stack
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 400,
        }}
        spacing={1}
      >
        {errorBox && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorBox}</strong>
          </Alert>
        )}

        {success && !isLoading && !errorBox && (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{successMessages.delete}</strong>
          </Alert>
        )}

        {isLoading && !errorBox && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>

      {!isLoading && !errorBox && !success && <DeleteConfirm action={handleSubmit} deleteItem={ad} />}
    </Container>
  );
};

export default DeleteAd;
