import expess from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import roomtypeController from '../controllers/roomtypeController';
import roomController from '../controllers/roomController';
import serviceController from '../controllers/serviceController';
import bookingController from '../controllers/bookingController';

let router = expess.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-user', userController.handleGetAllUsers);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);

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

  router.post('/api/create-new-service', serviceController.handleCreateService);
  router.get('/api/get-all-service', serviceController.handleGetService);
  router.put('/api/edit-service', serviceController.handleEditService);
  router.delete('/api/delete-service', serviceController.handleDeleteService);
  router.get('/api/search-service', serviceController.searchServiceByName);

  router.post('/api/create-new-booking', bookingController.handleCreateBooking);
  router.get('/api/get-all-booking', bookingController.handleGetBooking);
  router.get('/api/get-all-booking-by-status', bookingController.handleGetBookingByStatus);
  router.put('/api/edit-booking', bookingController.handleEditBooking);
  router.delete('/api/delete-booking', bookingController.handleDeleteBooking);

  return app.use('/', router);
};

module.exports = initWebRoutes;
