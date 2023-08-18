import UserForm from '../UserForm.js/UserForm';

const Login = () => {
  const handleSubmit = (user) => {
    console.log('user:', user);
  };

  return <UserForm action={handleSubmit} actionText="Login" />;
};
export default Login;
