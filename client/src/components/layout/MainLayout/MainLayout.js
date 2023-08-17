import { Container } from '@mui/material';
import Footer from '../Footer/Footer';
import MainMenu from '../MainMenu/MainMenu';

const MainLayout = ({ children }) => (
  <Container>
    <MainMenu />
    {children}
    <Footer />
  </Container>
);

export default MainLayout;
