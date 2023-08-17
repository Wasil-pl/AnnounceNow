import { Alert, Container } from '@mui/material';
import styles from './ErrorLoad.module.scss';

const ErrorLoad = () => {
  return (
    <Container className="centered">
      <Alert className={styles.alert} variant="filled" severity="error">
        {' '}
        Something went wrong. Please try again later.
      </Alert>
    </Container>
  );
};

export default ErrorLoad;
