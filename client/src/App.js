import { Route, Routes } from 'react-router-dom';

// imports for React Router
import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/pages/Home/HomePage';
import Announcment from './components/features/Announcement/Announcement';
import AddAnnouncment from './components/pages/AddAnnouncment/AddAnnouncment';
import EditAnnouncment from './components/pages/EditAnnouncment/EditAnnouncment';
import DeleteAd from './components/features/DeleteAd/DeleteAd';
import SearchPhrase from './components/features/SearchPhrase/SearchPhrase';
import Register from './components/features/Register/Register';
import Login from './components/features/Login/Login';
import Logout from './components/features/Logout/Logout';
import User from './components/pages/User/User';
import NotFoundPage from './components/pages/NotFound/NotFoundPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ad/:id" element={<Announcment />} />
        <Route path="/ad/add" element={<AddAnnouncment />} />
        <Route path="/ad/edit/:id" element={<EditAnnouncment />} />
        <Route path="/ad/remove/:id" element={<DeleteAd />} />
        <Route path="/ad/search/:searchPhrase" element={<SearchPhrase />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
