import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import AdminLayout from '../components/Layouts/AdminLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import BlankLayout from '../components/Layouts/BlankLayout';

const checkLayout = (route) => {
  if (route?.layout) {
    switch (route.layout) {
      case 'auth':
        return <DefaultLayout>{route.element}</DefaultLayout>;
      case 'admin':
        return <AdminLayout>{route.element}</AdminLayout>;
      default:
        return <DefaultLayout>{route.element}</DefaultLayout>;
    }
  }
  return (
    <BlankLayout>
      <>{route.element}</>
    </BlankLayout>
  );
};

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: checkLayout(route),
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
