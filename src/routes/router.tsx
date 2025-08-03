import { createBrowserRouter } from 'react-router-dom';
import Details from '../components/Details/Details';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';
import About from '../pages/AboutPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          path: '',
          element: <Details />,
          index: true,
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
  ],
  {
    basename: '/react-2025-q3/rs-react-app',
  }
);

export default router;
