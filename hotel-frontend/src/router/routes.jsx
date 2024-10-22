import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import AdminPage from '../Pages/Admin/AdminPage';
import ManageTyperoom from '../Pages/Admin/ManageTyperoom';
import ManageRoom from '../Pages/Admin/ManageRoom';
import Booking from '../Pages/Booking';
import ManageService from '../Pages/Admin/ManageService';

export const routes = [
  {
    path: '/',
    element: <Home />,
    layout: 'auth',
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/booking',
    element: <Booking />,
    layout: 'auth',
  },
  {
    path: '/admin',
    element: <AdminPage />,
    layout: 'admin',
  },
  {
    path: '/admin/manageTyperoom',
    element: <ManageTyperoom />,
    layout: 'admin',
  },
  {
    path: '/admin/manageRoom',
    element: <ManageRoom />,
    layout: 'admin',
  },
  {
    path: '/admin/manageService',
    element: <ManageService />,
    layout: 'admin',
  },
];
