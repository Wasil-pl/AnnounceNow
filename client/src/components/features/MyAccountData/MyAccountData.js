import React from 'react';
import { AVATARS_URL } from '../../../config';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Phone } from '@mui/icons-material';
import styles from './MyAccountData.module.scss';

const MyAccountData = ({ user }) => {
  return (
    <div className={styles.cardContainer}>
      <Card>
        <CardHeader
          className={styles.card}
          avatar={<Avatar src={AVATARS_URL + user.avatar} alt={user.login.charAt(0).toUpperCase()} />}
          title={user.login}
        />
        <CardContent>
          <div>
            <Phone />
            <Typography variant="body2" color="text.secondary">
              {user.phoneNumber}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAccountData;
