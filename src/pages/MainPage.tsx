import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import App from '../components/App/App';
import Header from '../components/Header/Header';

export default function MainPage() {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParam.get('details');
  const page = searchParam.get('page') || '1';

  const handleMainClick = () => {
    if (details) {
      navigate(`/?page=${page}`);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex">
        <div
          className="flex-1 border-r border-green-200"
          onClick={handleMainClick}
        >
          <App />
        </div>
        {details ? (
          <div className="w-[40%] max-w-md bg-white">
            <Outlet />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
