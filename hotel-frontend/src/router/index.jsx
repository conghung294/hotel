import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import BlankLayout from '../components/Layouts/BlankLayout';
import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import ReceptionistLayout from '../components/Layouts/ReceptionistLayout';

const checkLayout = (route) => {
  if (route?.layout) {
    switch (route.layout) {
      case 'auth':
        return <DefaultLayout>{route.element}</DefaultLayout>;
      case 'admin':
        return <LayoutAdmin>{route.element}</LayoutAdmin>;
      case 'receptionist':
        return <ReceptionistLayout>{route.element}</ReceptionistLayout>;
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
