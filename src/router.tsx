import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PromoInput from './components/PromoInput';
import PromoSuccess from './components/PromoSuccess';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PromoInput />,
      },
      {
        path: 'activated',
        element: <PromoSuccess />,
      },
    ],
  },
]);