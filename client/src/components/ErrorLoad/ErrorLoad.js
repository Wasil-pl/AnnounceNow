import { Alert, Container } from '@mui/material';
import styles from './ErrorLoad.module.scss';

const ErrorLoad = ({ errorMsg }) => {
  return (
    <Container className="centered">
      <Alert className={styles.alert} variant="filled" severity="error">
        {' '}
        {errorMsg}
      </Alert>
    </Container>
  );
};

export default ErrorLoad;
