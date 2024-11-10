require('dotenv').config();
import nodemailer from 'nodemailer';
import { formatCurrency } from '../utils/CommonUtils';
import moment from 'moment';

let getBodyHTMLEmail = (data) => {
  const services = data?.services
    ?.map((item) => {
      return `<div>${item.name}</div>`; // Tạo chuỗi HTML cho dịch vụ
    })
    .join('');

  let result = `
            <div>Bạn vui lòng kiểm tra lại thông tin đặt phòng. Nếu có gì sai sót xin vui lòng liên hệ với khách sạn để có thể cập nhật lại!</div>
            <div>Tên khách hàng: ${data?.bookingData?.name}</div>
            <div>SĐT: ${data?.bookingData?.phoneNumber}</div>
            <div>Địa chỉ: ${data?.bookingData?.address}</div>
            <div>Giới tính: ${data?.bookingData.gender}</div> 
            <div>Thời gian đặt phòng: ${moment(data?.createdAt).format(
              'HH:mm:ss DD/MM/YYYY'
            )} </div>   
            <div>Loại phòng: ${data?.typeData?.name}</div>
            <div>Giá phòng: ${formatCurrency(data?.typeData?.price)}</div>
            <div>Thời gian đến: ${moment(data?.timeCome).format('DD/MM/YYYY')}</div>
            <div>Thời gian đi: ${moment(data?.timeGo).format('DD/MM/YYYY')}</div>
            <div>Dịch vụ: ${services}</div>
            <div>Tổng cộng: ${formatCurrency(data?.price)}</div>
  `;

  return result;
};

let getBodyHTMLEmailForgotPassword = ({ token }) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  return `
  <div>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link sau để đặt lại: <a href=${resetLink}>Đặt lại mật khẩu!</a> </div>
  `;
};

let sendSimpleEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"HotelManager" <hotel@gmail.com>', // sender address
    to: data?.bookingData?.email, // list of receivers
    subject: 'Thông tin đặt phòng', // Subject line
    // text: 'Hello world?', // plain text body
    html: getBodyHTMLEmail(data),
  });
};

let sendForgotPasswordEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"HotelManager" <hotel@gmail.com>', // sender address
    to: data?.email, // list of receivers
    subject: 'Đặt lại mật khẩu', // Subject line
    // text: 'Hello world?', // plain text body
    html: getBodyHTMLEmailForgotPassword(data),
  });
};

module.exports = {
  sendSimpleEmail,
  sendForgotPasswordEmail,
};
