import db from '../models/index';
import { Op } from 'sequelize';

let createNewService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Service.create({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
      });
      resolve({
        errCode: 0,
        message: 'OK',
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getService = async (serviceId) => {
  try {
    let services = '';
    if (serviceId === 'ALL') {
      services = await db.Service.findAll();
    }
    if (serviceId && serviceId !== 'ALL') {
      services = db.Service.findOne({
        where: { id: typeId },
      });
    }
    if (services && services.length > 0) {
      services.forEach((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        }
      });
    }

    return services;
  } catch (e) {
    console.log(e);
  }
};

let updateService = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 2,
        errMessage: 'Missing parameter',
      };
    }
    let service = await db.Service.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (service) {
      service.name = data.name;
      service.description = data.description;
      service.price = data.price;

      await service.save();
      return {
        errCode: 0,
        message: 'Updated successfully',
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'Service not found',
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let deleteService = async (id) => {
  try {
    let Service = await db.Service.findOne({
      where: { id: id },
    });
    if (!Service) {
      return {
        errCode: 2,
        errMessage: 'Service not exist',
      };
    }

    await db.Service.destroy({
      where: { id: id },
    });

    return {
      errCode: 0,
      message: 'Service deleted',
    };
  } catch (err) {
    console.error(err);
  }
};

const searchServiceByName = async (name) => {
  try {
    const services = await db.Service.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // tìm kiếm theo tên phòng (không phân biệt chữ hoa/chữ thường)
        },
      },
    });

    if (services && services.length > 0) {
      services.forEach((item) => {
        if (item?.image) {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        }
      });
    }

    return services;
  } catch (error) {
    console.log(error);
  }
};
const updateBookingPrice = async (bookingId) => {
  try {
    // Tìm booking theo ID, bao gồm thông tin Roomtype và các Service liên quan
    const booking = await db.Booking.findOne({
      where: { id: bookingId },
      include: [
        {
          model: db.Roomtype,
          as: 'typeData', // Quan hệ với Roomtype
          attributes: ['price'], // Chỉ lấy giá phòng
        },
        {
          model: db.Service,
          as: 'services', // Quan hệ với Service thông qua BookingService
          attributes: ['price'], // Lấy giá dịch vụ
          through: {
            attributes: ['quantity'], // Lấy quantity từ bảng BookingService
          },
        },
      ],
    });

    if (!booking) {
      throw new Error(`Booking with ID ${bookingId} not found`);
    }

    // Tính tổng giá phòng
    const roomPrice = booking.typeData.price || 0;

    // Tính tổng giá dịch vụ
    const serviceTotalPrice = booking.services.reduce((total, service) => {
      const quantity = service.BookingService.quantity || 0; // Lấy quantity từ bảng trung gian
      return total + service.price * quantity;
    }, 0);

    // Cập nhật giá tổng (roomPrice + serviceTotalPrice)
    const updatedPrice = (roomPrice + serviceTotalPrice) * (1 - booking?.sale / 100);

    await booking.update({ price: updatedPrice });
  } catch (error) {
    console.error(`Error updating booking price: ${error.message}`);
  }
};

const updateServiceForBooking = async (data) => {
  try {
    let bookingId = '';
    const dataService = data?.map(async (item) => {
      bookingId = item?.bookingId;
      // Kiểm tra nếu số lượng bằng 0, thực hiện xóa dịch vụ khỏi bảng BookingService
      if (item?.quantity === 0) {
        // Xóa dịch vụ khỏi BookingService nếu quantity = 0
        await db.BookingService.destroy({
          where: {
            bookingId: item?.bookingId,
            serviceId: item?.id,
          },
        });
      } else {
        // Nếu quantity > 0, kiểm tra dịch vụ đã tồn tại chưa
        const existingService = await db.BookingService.findOne({
          where: {
            bookingId: item?.bookingId,
            serviceId: item?.id,
          },
        });

        if (existingService) {
          // Nếu đã tồn tại, cập nhật số lượng
          await existingService.update({
            quantity: item?.quantity,
          });
        } else {
          // Nếu chưa tồn tại, tạo mới
          await db.BookingService.create({
            bookingId: item?.bookingId,
            serviceId: item?.id,
            quantity: item?.quantity,
          });
        }
      }
    });

    // Chờ các promises hoàn thành
    await Promise.all(dataService);
    await updateBookingPrice(bookingId);
  } catch (error) {
    console.log(error);
  }
};

let getServiceByBooking = async (bookingId) => {
  try {
    // Lấy danh sách dịch vụ
    let services = await db.Service.findAll();

    // Lấy danh sách bookingService dựa trên bookingId
    let bookingServices = await db.BookingService.findAll({
      where: { bookingId: bookingId },
    });

    // Tạo map để tìm kiếm nhanh quantity theo serviceId
    let bookingServiceMap = {};
    bookingServices.forEach((item) => {
      bookingServiceMap[item.serviceId] = item.quantity;
    });

    // Gán quantity vào từng dịch vụ
    let servicesWithQuantity = services.map((item) => {
      if (item?.image) {
        item.image = Buffer.from(item.image, 'base64').toString('binary');
      }
      let quantity = bookingServiceMap[item.id] || 0; // Lấy quantity hoặc mặc định là 0
      return {
        ...item.dataValues, // Lấy dữ liệu dịch vụ
        quantity, // Gán trường quantity
      };
    });

    return servicesWithQuantity;
  } catch (e) {
    console.log(e);
    throw e; // Nên throw lỗi để xử lý ở tầng trên nếu cần
  }
};

module.exports = {
  createNewService,
  getService,
  updateService,
  deleteService,
  searchServiceByName,
  updateServiceForBooking,
  getServiceByBooking,
};
