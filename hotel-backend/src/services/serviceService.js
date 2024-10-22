import db from '../models/index';

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

module.exports = {
  createNewService,
  getService,
  updateService,
  deleteService,
};
