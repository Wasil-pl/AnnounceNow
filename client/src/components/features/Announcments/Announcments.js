import { useSelector } from 'react-redux';
import AdThumb from '../AdThumb/AdThumb';
import { getAllData } from '../../../redux/adsRedux';

const Announcments = () => {
  const adsData = useSelector(getAllData);

  return (
    <div>
      <h1>Announcments</h1>
      <AdThumb data={adsData} />
    </div>
  );
};
export default Announcments;
