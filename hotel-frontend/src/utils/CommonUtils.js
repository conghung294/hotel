const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const formatCurrency = (value, locale = 'vi-VN', currency = 'VND') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const generateId = (prefix, length, id) => {
  // Chuyển id thành chuỗi và thêm số 0 ở đầu để đạt độ dài yêu cầu
  const paddedId = id.toString().padStart(length - prefix.length, '0');

  // Kết hợp prefix với id đã được định dạng
  return `${prefix}${paddedId}`;
};

export { getBase64, formatCurrency, generateId };
