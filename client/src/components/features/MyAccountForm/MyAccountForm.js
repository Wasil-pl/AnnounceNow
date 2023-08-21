import React from 'react';
import { AVATARS_URL } from '../../../config';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Phone } from '@mui/icons-material';
import styles from './MyAccountForm.module.scss';

const MyAccountForm = ({ user }) => {
  return (
    <div className={styles.cardContainer}>
      <Card>
        <CardHeader
          className={styles.card}
          avatar={<Avatar src={AVATARS_URL + user.user.avatar} alt={user.user.login.charAt(0).toUpperCase()} />}
          title={user.user.login}
        />
        <CardContent>
          <div>
            <Phone />
            <Typography variant="body2" color="text.secondary">
              {user.user.phoneNumber}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAccountForm;
