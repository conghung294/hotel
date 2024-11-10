/* eslint-disable react/prop-types */
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';

import { getRoomtypeAvailableService } from '../service/roomtypeService';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ setRoomtype, setTime, dates, setDates, setIsChoice }) => {
  // Hàm để vô hiệu hóa các ngày trước ngày hiện tại
  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleApply = async () => {
    if (dates && dates[0] && dates[1]) {
      setIsChoice(true);
      const [start, end] = dates;

      const roomtype = await getRoomtypeAvailableService(start, end);
      setRoomtype(roomtype.data);
      setTime(dayjs(dates[1]).diff(dayjs(dates[0]), 'day'));
    }
  };

  const handleCancel = () => {
    setDates(null);
    setRoomtype(null);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <RangePicker
        value={dates}
        onChange={(newDates) => setDates(newDates)}
        format="DD/MM/YYYY"
        style={{ width: '100%', height: '60px' }}
        placeholder={['Chọn ngày đến', 'Chọn ngày đi']}
        defaultValue={[dayjs(), dayjs().add(1, 'day')]}
        disabledDate={disabledDate} // Vô hiệu hóa những ngày trước hiện tại
      />

      {dates && dates[0] && dates[1] && (
        <div className="w-full h-[40px] flex gap-1 items-center justify-center mt-4 bg-[#E2EEFB] text-[#2D70CA] font-bold rounded-md">
          <div>{dayjs(dates[1]).diff(dayjs(dates[0]), 'day')}</div>
          <div>ngày</div>
        </div>
      )}

      <div className="mt-5 flex justify-between w-full ">
        <Button onClick={() => handleCancel()} className="w-[48%] py-5">
          <MdOutlineCancel size={20} />
          <div className="">Hủy</div>
        </Button>
        <Button type="primary" onClick={handleApply} className="w-[48%] py-5">
          <CiSearch size={20} />
          <div className="font-bold">Tìm phòng</div>
        </Button>
      </div>
    </div>
  );
};

export default DateRangePicker;
