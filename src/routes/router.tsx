import { createBrowserRouter } from 'react-router-dom';
import Details from '../components/Details/Details';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';
import About from '../pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <Details />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
