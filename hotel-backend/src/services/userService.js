import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExistUserEmail = await checkUserEmail(email);
      if (isExistUserEmail) {
        let user = await db.User.findOne({
          attributes: ['id', 'email', 'roleId', 'password', 'name'],
          where: { email: email },
          raw: true,
        });
        if (user) {
          const passwordDb = user.password;
          let check = await bcrypt.compareSync(password, passwordDb);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'OK';
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = 'User not found';
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = 'Your email is not existing';
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (useremail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: useremail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = async (userId) => {
  try {
    let users = '';
    if (userId === 'ALL') {
      users = db.User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
    }
    if (userId && userId !== 'ALL') {
      users = db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['password'],
        },
      });
    }
    return users;
  } catch (e) {
    console.log(e);
  }
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);

      if (check === true) {
        resolve({
          errCode: '1',
          errMessage: 'Email đã tồn tại, vui lòng chọn email khác!',
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
        });
      }

      resolve({
        errCode: 0,
        message: 'OK',
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (!user) {
      return {
        errCode: 2,
        errMessage: 'User not exist',
      };
    }

    await db.User.destroy({
      where: { id: id },
    });

    return {
      errCode: 0,
      message: 'User deleted',
    };
  } catch (err) {
    console.error(err);
  }
};

let updateUserData = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 2,
        errMessage: 'Missing parameter',
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (user) {
      user.name = data.firstName;
      user.address = data.address;
      user.roleId = data.roleId;
      user.gender = data.gender;
      user.phoneNumber = data.phoneNumber;

      await user.save();
      return {
        errCode: 0,
        message: 'Updated successfully',
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'User not found',
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
