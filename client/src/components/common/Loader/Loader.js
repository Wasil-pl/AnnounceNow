import { CircularProgress, Container } from '@mui/material';

const Loader = () => {
  return (
    <Container className="centered">
      <CircularProgress />
    </Container>
  );
};

export default Loader;
