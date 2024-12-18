import Login from '../Pages/Client/Login';
import Register from '../Pages/Client/Register';
import Home from '../Pages/Client/Home';
import AdminPage from '../Pages/Admin/AdminPage';
import ManageTyperoom from '../Pages/Admin/ManageTyperoom';
import ManageRoom from '../Pages/Admin/ManageRoom';
import Booking from '../Pages/Client/Booking';
import ManageService from '../Pages/Admin/ManageService';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import Roomtype from '../Pages/Client/Roomtype';
import Entertainment from '../Pages/Client/Entertainment';
import Cuisine from '../Pages/Client/Cuisine';
import Locaion from '../Pages/Client/Locaion';
import ManageUser from '../Pages/Admin/ManageUser';

import FailurePage from '../Pages/Client/FailurePage';
import PaymentStatusPage from '../Pages/Client/PaymentStatusPage';
import BookingList from '../Pages/Admin/BookingList';
import BookingCalendar from '../Pages/Admin/BookingCalendar';
import BookingDiagram from '../Pages/Admin/BookingDiagram';
import PersonalInfo from '../Pages/Client/PersonalInfo';
import ManageCustomer from '../Pages/Admin/ManageCustomer';

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
    path: '/personal-info',
    element: <PersonalInfo />,
    layout: 'auth',
  },
  {
    path: '/booking-history',
    element: <PersonalInfo />,
    layout: 'auth',
  },
  {
    path: '/payment/result',
    element: <PaymentStatusPage />,
  },
  {
    path: '/payment/failure',
    element: <FailurePage />,
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

  // {
  //   path: '/1',
  //   element: <BookingForm />,
  //   layout: 'auth',
  // },

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
    path: '/admin/manageUser',
    element: <ManageUser />,
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
    path: '/admin/bookingList',
    element: <BookingList />,
    layout: 'admin',
  },
  {
    path: '/admin/bookingCalendar',
    element: <BookingCalendar />,
    layout: 'admin',
  },
  {
    path: '/admin/bookingDiagram',
    element: <BookingDiagram />,
    layout: 'admin',
  },

  {
    path: '/admin/manageCustomer',
    element: <ManageCustomer />,
    layout: 'admin',
  },
];
