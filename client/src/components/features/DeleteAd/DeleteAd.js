import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAdRequest, getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AVATARS_URL } from '../../../config';
import styles from './DeleteAd.module.scss';
import ErrorLoad from '../ErrorLoad/ErrorLoad';
import Loader from '../Loader/Loader';
import Success from '../Success/Success';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAdRequest(id));

    if (!errorBox) {
      setSuccess(true);
    }
  };

  if (!ad) return <div> No data </div>;

  const successMsg = 'Post deleted successfully';

  if (errorBox) return <ErrorLoad errorMsg={errorBox} />;
  if (isLoading && !errorBox) return <Loader />;
  if (success && !isLoading && !errorBox) return <Success successMsg={successMsg} />;

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          avatar={<Avatar src={AVATARS_URL + ad.seller.avatar} alt={ad.seller.login.charAt(0).toUpperCase()} />}
          title={ad.seller.login}
        />
        <CardContent className={styles.CardContent}>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this Ad?
          </Typography>
          <Button onClick={(e) => handleSubmit(e)} startIcon={<DeleteIcon />} variant="contained" color="error">
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAd;
