import jwt from 'jsonwebtoken';
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const nonSecurePaths = ['/api/logout', '/api/login', '/api/register', '/api/refresh-token'];

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  // Lấy token từ header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ errCode: 1, message: 'Access Token is missing' });
  }

  try {
    // Xác minh token
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user; // Lưu thông tin user vào request để sử dụng trong controller
    next(); // Tiếp tục xử lý request
  } catch (error) {
    res.status(403).json({ errCode: 2, message: 'Invalid Access Token' });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  checkUserJWT,
  authorizeRole,
};
