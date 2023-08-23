import React from 'react';
import styles from './DeleteConfirm.module.scss';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AVATARS_URL } from '../../../config';

const DeleteConfirm = ({ deleteItem, action }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    action(deleteItem._id);
  };

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          avatar={
            <Avatar
              src={AVATARS_URL + deleteItem.seller.avatar}
              alt={deleteItem.seller.login.charAt(0).toUpperCase()}
            />
          }
          title={deleteItem.seller.login}
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

export default DeleteConfirm;
