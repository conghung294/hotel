import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import AdminPage from '../Pages/Admin/AdminPage';
import ManageTyperoom from '../Pages/Admin/ManageTyperoom';
import ManageRoom from '../Pages/Admin/ManageRoom';
import Booking from '../Pages/Booking';
import ManageService from '../Pages/Admin/ManageService';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import BookingSchedule from '../Pages/Admin/BookingSchedule';
import Roomtype from '../Pages/Roomtype';
import Entertainment from '../Pages/Entertainment';
import Cuisine from '../Pages/Cuisine';
import Locaion from '../Pages/Locaion';

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
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/booking',
    element: <Booking />,
    layout: 'auth',
  },
  {
    path: '/room-type',
    element: <Roomtype />,
    layout: 'auth',
  },
  {
    path: '/entertainment',
    element: <Entertainment />,
    layout: 'auth',
  },
  {
    path: '/cuisine',
    element: <Cuisine />,
    layout: 'auth',
  },

  {
    path: '/location',
    element: <Locaion />,
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
  {
    path: '/admin/booking',
    element: <BookingSchedule />,
    layout: 'admin',
  },
];
