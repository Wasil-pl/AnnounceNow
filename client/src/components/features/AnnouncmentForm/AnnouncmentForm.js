import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { AVATARS_URL, IMAGES_URL } from '../../../config';
import styles from './AnnouncmentForm.module.scss';
import { titleTypography } from '../AdThumb/AdThumbSettings';
import EditAnnouncment from '../../pages/EditAnnouncment/EditAnnouncment';
import { Link } from 'react-router-dom';
import DeleteAd from '../DeleteAd/DeleteAd';
import { useSelector } from 'react-redux';
import { getUserLoggedState } from '../../../redux/UserRedux';

const AnnouncmentForm = ({ data }) => {
  const logged = useSelector(getUserLoggedState);

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          avatar={
            <Avatar
              className={styles.avatar}
              aria-label="recipe"
              src={AVATARS_URL + data.seller.avatar}
              alt={data.seller.login.charAt(0).toUpperCase()}
            />
          }
          titleTypographyProps={titleTypography}
          title={data.title}
          subheader={data.price + ' zł'}
        />
        <Divider />
        <CardMedia className={styles.cardPicture} component="img" image={IMAGES_URL + data.picture} alt={data.title} />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.content}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent className={styles.cardActions}>
          <Typography variant="body2" color="text.secondary">
            <span className={styles.actions}>Seller:</span> {data.seller.login}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className={styles.actions}>Phone:</span> {data.seller.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className={styles.actions}>Address:</span> {data.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className={styles.actions}>Ad posting date:</span> {data.date}
          </Typography>
        </CardContent>
        <Divider />
        {!!logged && (
          <CardActions>
            <Link to={`/ad/edit/${data._id}`} element={<EditAnnouncment />}>
              <Button endIcon={<SendIcon />} variant="outlined" size="small">
                Edit
              </Button>
            </Link>
            <Link to={`/ad/remove/${data._id}`} element={<DeleteAd />}>
              <Button startIcon={<DeleteIcon />} color="error" variant="outlined" size="small">
                Delete
              </Button>
            </Link>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default AnnouncmentForm;
