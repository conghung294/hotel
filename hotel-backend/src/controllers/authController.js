import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index';

// Secret key cho JWT
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Tạo refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Refresh Token có thời gian sống 7 ngày
};

// Tạo access token
const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '10m' }); // Access Token có thời gian sống 15 phút
};

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let userData = {};
  let accessToken = '';
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

      accessToken = generateAccessToken({
        role: user?.roleId,
        email: user?.email,
        name: user?.name,
        id: user?.id,
      });
      const refreshToken = generateRefreshToken({ user: user?.id });

      // Lưu refresh token vào HttpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // Chỉ có thể truy cập từ server, không qua JavaScript
        // sameSite: 'Strict', // Chống CSRF
      });
    } else {
      userData.errCode = 3;
      userData.errMessage = 'Wrong password';
    }
  } else {
    userData.errCode = 2;
    userData.errMessage = 'User not found';
  }

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input value',
    });
  }

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    data: { user: userData?.user, accessToken },
  });
};

const handleRefreshToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(403).send('Refresh token required');
  }

  // Kiểm tra refresh token
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid refresh token');
    }

    const userId = decoded?.id;
    if (userId) {
      // Truy xuất thông tin người dùng nếu cần (không bắt buộc)
      const user = await db.User.findOne({
        attributes: ['id', 'email', 'roleId'],
        where: { id: userId },
        raw: true,
      });

      if (!user) {
        return res.status(404).json({ errCode: 3, message: 'User not found' });
      }

      // Tạo access token mới
      const newAccessToken = generateAccessToken({
        role: user.roleId,
        email: user.email,
      });

      return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data: { accessToken: newAccessToken },
      });
    } else {
      return res.status(404).json({ errCode: 3, message: 'User not found' });
    }
  });
};

const getUserAccount = (req, res) => {
  return res.status(200).json({
    EM: 'OK',
    EC: 0,
    DT: {
      id: req?.user?.id,
      email: req?.user?.email,
      name: req.user?.name,
      roleId: req?.user?.role,
    },
  });
};

const handleLogout = async (req, res) => {
  try {
    await res.clearCookie('refreshToken', { domain: process.env.COOKIE_DOMAIN, path: '/' });

    return res.status(200).json({
      EM: 'clear cookies successfully',
      EC: 0,
      DT: '',
    });
  } catch (e) {
    return res.status(500).json({
      EM: 'error from sever',
      EC: '-1',
      DT: '',
    });
  }
};

module.exports = { handleLogin, handleRefreshToken, getUserAccount, handleLogout };
