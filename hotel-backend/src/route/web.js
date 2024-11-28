import expess from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import roomtypeController from '../controllers/roomtypeController';
import roomController from '../controllers/roomController';
import serviceController from '../controllers/serviceController';
import bookingController from '../controllers/bookingController';
import settingController from '../controllers/settingController';
import paymentController from '../controllers/paymentController';

let router = expess.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-user', userController.handleGetAllUsers);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);
  router.get('/api/search-user', userController.searchUserByName);
  router.post('/api/forgot-password', userController.handleForgotPassword);
  router.post('/api/reset-password', userController.handleResetPassword);

  router.post('/api/create-new-roomtype', roomtypeController.handleCreateRoomtype);
  router.get('/api/get-all-roomtype', roomtypeController.handleGetRoomtype);
  router.get('/api/get-all-roomtype-available', roomtypeController.handleGetRoomtypeAvailable);
  router.put('/api/edit-roomtype', roomtypeController.handleEditRoomtype);
  router.delete('/api/delete-roomtype', roomtypeController.handleDeleteRoomtype);
  router.get('/api/search-roomtype', roomtypeController.searchRoomtypeByName);

  router.post('/api/create-new-room', roomController.handleCreateRoom);
  router.get('/api/get-all-room', roomController.handleGetRoom);
  router.put('/api/edit-room', roomController.handleEditRoom);
  router.delete('/api/delete-room', roomController.handleDeleteRoom);
  router.get('/api/get-all-room-available', roomController.handleGetRoomAvailable);
  router.get('/api/search-room', roomController.searchRoomByName);
  router.post('/api/check-in-room', roomController.handleCheckIn);
  router.post('/api/check-out-room', roomController.handleCheckOut);
  router.get('/api/get-info-check-in-by-room', roomController.handleGetInfoCheckIn);

  router.post('/api/create-new-service', serviceController.handleCreateService);
  router.get('/api/get-all-service', serviceController.handleGetService);
  router.put('/api/edit-service', serviceController.handleEditService);
  router.delete('/api/delete-service', serviceController.handleDeleteService);
  router.get('/api/search-service', serviceController.searchServiceByName);
  router.post('/api/update-service-for-booking', serviceController.handleUpdateServiceForBooking);
  router.get('/api/get-service-by-booking', serviceController.handleGetServiceByBooking);

  router.post('/api/create-new-booking', bookingController.handleCreateBooking);
  router.get('/api/get-all-booking', bookingController.handleGetBooking);
  router.get('/api/get-all-booking-by-status', bookingController.handleGetBookingByStatus);
  router.get('/api/get-booking-schedule', bookingController.handleGetBookingSchedule);
  router.put('/api/edit-booking', bookingController.handleEditBooking);
  router.delete('/api/delete-booking', bookingController.handleDeleteBooking);
  router.get('/api/get-daily-use', bookingController.handleCaculateDailyUse);
  router.get('/api/get-revenue', bookingController.handleCaculateRevenue);

  router.put('/api/update-setting', settingController.updateSetting);
  router.get('/api/get-setting', settingController.getSetting);

  router.post('/vnpay/payment', paymentController.handlePayment);
  router.get('/vnpay_return', paymentController.handleReturn);

  return app.use('/', router);
};

module.exports = initWebRoutes;
