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
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Access Token có thời gian sống 15 phút
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
    data: { ...userData?.user, accessToken },
  });
};

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).send('Refresh token required');
  }

  // Kiểm tra refresh token
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user);

    return res.status(200).json({
      errCode: 0,
      message: 'OK',
      data: { accessToken: newAccessToken },
    });
  });
};

const handleProtected = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy access token từ header

  if (!token) {
    return res.status(403).send('Access token required');
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid access token');
    }

    return res.status(200).json({ errCode: 0, message: 'Protected route', data: user });
  });
};

module.exports = { handleLogin, handleRefreshToken, handleProtected };
