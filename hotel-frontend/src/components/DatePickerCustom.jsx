import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';

const DatePickerCustom = ({ date, setDate, disabled }) => {
  // Hàm để vô hiệu hóa các ngày trước ngày hiện tại
  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(dayjs(newDate))}
      format="DD/MM/YYYY"
      style={{ width: '100%', height: '100%' }}
      disabledDate={disabledDate} // Vô hiệu hóa những ngày trước hiện tại
      allowClear={false}
      disabled={disabled || false}
    />
  );
};

export default DatePickerCustom;
