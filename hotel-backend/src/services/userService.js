import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Op } from 'sequelize';
import db from '../models/index';
import { sendForgotPasswordEmail } from './emailService';

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

let getAllUsers = async (userId) => {
  try {
    let users = '';
    if (userId === 'ALL') {
      users = db.User.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: {
          roleId: {
            [Op.ne]: null, // Lọc những user có roleId khác null
          },
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

const handleForgotPassword = async (email) => {
  try {
    // Kiểm tra email người dùng
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return {
        errCode: 1,
        errMessage: 'Email không tồn tại',
      };
    }

    // Tạo token đặt lại mật khẩu
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // Token có hiệu lực trong 1 giờ

    // Lưu token và thời gian hết hạn vào cơ sở dữ liệu
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    await sendForgotPasswordEmail({ token, email });
    return {
      errCode: 0,
      errMessage: 'Success',
    };
  } catch (error) {
    console.log(error);
  }
};

const handleResetPassword = async ({ token, newPassword }) => {
  try {
    // Tìm người dùng dựa vào token và kiểm tra token hết hạn chưa
    const user = await db.User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return {
        errCode: 0,
        errMessage: 'Link không hợp lệ hoặc đã hết hạn!',
      };
    }

    // Cập nhật mật khẩu mới và xóa token
    let hashPasswordFromBcrypt = await hashUserPassword(newPassword);
    user.password = hashPasswordFromBcrypt; // Đừng quên hash mật khẩu trước khi lưu
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    return {
      errCode: 0,
      errMessage: 'Mật khẩu của bạn đã được đặt lại thành công',
    };
  } catch (error) {
    console.log(error);
  }
};

const searchUserByName = async (query) => {
  try {
    const users = await db.User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            phoneNumber: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });

    return users;
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi tìm kiếm người dùng.' });
  }
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  handleForgotPassword,
  handleResetPassword,
  searchUserByName,
};
