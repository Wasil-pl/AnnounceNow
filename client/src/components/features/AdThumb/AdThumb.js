import { Avatar, Button, Card, CardActions, CardHeader, CardMedia } from '@mui/material';
import { AVATARS_URL, IMAGES_URL } from '../../../config';
import styles from './AdThumb.module.scss';
import { titleTypography } from './AdThumbSettings';
import { Link } from 'react-router-dom';
import Announcment from '../Announcement/Announcement';

const AdThumb = ({ data }) => {
  const sortedData = data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className={styles.cardContainer}>
      {sortedData.map((item) => (
        <Card key={item._id} className={styles.card}>
          <CardHeader
            className={styles.cardHeader}
            avatar={
              <Avatar
                className={styles.avatar}
                aria-label="recipe"
                src={AVATARS_URL + item.seller.avatar}
                alt={item.seller.login.charAt(0).toUpperCase()}
              />
            }
            titleTypographyProps={titleTypography}
            title={item.title}
            subheader={item.price + ' zł'}
          />
          <CardMedia
            className={styles.cardPicture}
            component="img"
            image={IMAGES_URL + item.picture}
            alt={item.title}
          />
          <CardActions>
            <Link to={`/ad/${item._id}`} element={<Announcment />}>
              <Button size="small">Show More</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AdThumb;
