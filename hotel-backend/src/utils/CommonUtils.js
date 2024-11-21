const formatCurrency = (value, locale = 'vi-VN', currency = 'VND') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const combineDateTimeNative = (dateString, timeString) => {
  // Lấy phần ngày
  const date = new Date(dateString);
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Thiết lập giờ, phút, giây từ `timeString`
  date.setHours(hours, minutes, seconds);

  return date.toISOString(); // Trả về dạng ISO string
};

const combineDateTimeNative2 = (dateString, timeString) => {
  // Lấy phần ngày
  const date = new Date(dateString);
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Thiết lập giờ, phút, giây từ `timeString`
  date.setHours(hours, minutes, seconds);

  // Chuyển đổi thành định dạng "YYYY-MM-DD HH:mm:ss" mà không có múi giờ
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hoursFormatted = date.getHours().toString().padStart(2, '0');
  const minutesFormatted = date.getMinutes().toString().padStart(2, '0');
  const secondsFormatted = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
};

export { formatCurrency, combineDateTimeNative, combineDateTimeNative2 };
