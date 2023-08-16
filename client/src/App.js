import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAds } from './redux/adsRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAds()), [dispatch]);

  return <div>Witam</div>;
}

export default App;
