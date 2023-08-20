import { Link, useParams } from 'react-router-dom';
import { getAdById, getErrorState, getLoadingState, loadAdByIdRequest } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import ErrorLoad from '../ErrorLoad/ErrorLoad';
import { Avatar, Button, Card, CardActions, CardHeader, CardMedia } from '@mui/material';
import { AVATARS_URL, IMAGES_URL } from '../../../config';
import styles from './Announcment.module.scss';
import { titleTypography } from '../AdThumb/AdThumbSettings';

const Announcment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

  const adData = useSelector(getAdById);
  const isLoading = useSelector(getLoadingState);
  const errorBox = useSelector(getErrorState);

  if (errorBox) return <ErrorLoad errorMsg={errorBox} />;
  if (isLoading && !errorBox) return <Loader />;

  if (!adData) return <div> No data </div>;

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          avatar={
            <Avatar
              className={styles.avatar}
              aria-label="recipe"
              src={AVATARS_URL + adData.seller.avatar}
              alt={adData.seller.login.charAt(0).toUpperCase()}
            />
          }
          titleTypographyProps={titleTypography}
          title={adData.title}
          subheader={adData.price + ' zł'}
        />
        <CardMedia
          className={styles.cardPicture}
          component="img"
          image={IMAGES_URL + adData.picture}
          alt={adData.title}
        />
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Announcment;
