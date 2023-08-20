import { Alert, Container } from '@mui/material';
import styles from './Success.module.scss';

const Success = ({ successMsg }) => {
  return (
    <Container className="centered">
      <Alert className={styles.alert} variant="filled" severity="success">
        {' '}
        {successMsg}
      </Alert>
    </Container>
  );
};

export default Success;
