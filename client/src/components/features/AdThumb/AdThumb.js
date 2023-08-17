import { Avatar, Button, Card, CardActions, CardHeader, CardMedia } from '@mui/material';
import { AVATARS_URL, IMAGES_URL } from '../../../config';
import styles from './AdThumb.module.scss';
import { titleTypography } from './AdThumbSettings';

const AdThumb = ({ data }) => {
  const { list } = data;

  return (
    <div className={styles.cardContainer}>
      {list.map((item) => (
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
            <Button size="small">Show More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AdThumb;
