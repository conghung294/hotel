import db from '../models/index';

const getSetting = async (req, res) => {
  try {
    const defaultTime = await db.Setting.findOne({ order: [['updatedAt', 'DESC']] });
    if (!defaultTime) {
      return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        data: {
          timeCome: '12:00',
          timeGo: '14:00',
          comeFirst: '06:00',
          prePayment: 50,
        },
      });
    }
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: defaultTime,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

// API để cập nhật giờ mặc định
const updateSetting = async (req, res) => {
  const data = req.body;

  try {
    const defaultTime = await db.Setting.create(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      data: defaultTime,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Lỗi từ server',
      data: '',
    });
  }
};

module.exports = { getSetting, updateSetting };
