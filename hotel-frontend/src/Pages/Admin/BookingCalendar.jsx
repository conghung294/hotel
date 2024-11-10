import { useEffect, useState } from 'react';
import { ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import './BookingCalendar.scss';
import 'dayjs/locale/vi';
import viVN from 'antd/lib/locale/vi_VN';
import { getBookingScheduleService } from '../../service/bookingService';
import { toast } from 'react-toastify';

const BookingCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs()); // Bắt đầu với tháng hiện tại
  const daysInMonth = selectedMonth?.daysInMonth();
  const [data, setData] = useState();

  // Xử lý lịch đặt cho từng phòng, chỉ lấy lịch đặt trong tháng được chọn
  const rooms = data?.map((room) => ({
    id: room.id,
    bookings: room.bookings
      .filter((booking) => {
        // Lọc các lịch đặt trong tháng đã chọn
        const bookingStart = dayjs(booking.timeCome);
        // const bookingEnd = dayjs(booking.timeGo);
        return (
          bookingStart.month() === selectedMonth.month() &&
          bookingStart.year() === selectedMonth.year()
        );
      })
      .map((booking) => {
        const startDay = dayjs(booking.timeCome).date(); // Ngày của tháng cho timeCome
        const endDay = dayjs(booking.timeGo).date(); // Ngày của tháng cho timeGo
        const duration = endDay - startDay + 1; // Tính toán thời gian kéo dài trong ngày

        return {
          name: `${booking.name}`,
          startDay,
          duration,
        };
      }),
  }));

  // Xử lý thay đổi tháng
  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const getBookingSchedule = async () => {
    const res = await getBookingScheduleService();
    const dataWithKeys = res?.data?.map((item) => ({
      ...item,
      key: item?.id,
    }));
    if (res?.errCode === 0) {
      setData(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    getBookingSchedule();
  }, []);

  return (
    <div className="calendar-container">
      {/* Month Picker */}
      <div className="month-picker flex gap-2 items-center">
        <div className="font-bold">Vui lòng chọn tháng:</div>
        <ConfigProvider locale={viVN}>
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            format="MMMM - YYYY"
            allowClear={false}
          />
        </ConfigProvider>
      </div>

      {/* Calendar */}
      <div className="calendar mt-3">
        {/* Render the header row with day numbers */}
        <div className="calendar-header">
          <div className="calendar-header-room">Phòng</div>
          {[...Array(daysInMonth)]?.map((_, index) => (
            <div key={index} className="calendar-header-day">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Render each room row with bookings */}
        {rooms?.map((room) => (
          <div key={room.id} className="calendar-row">
            <div className="calendar-room-name">{room.id}</div>
            {[...Array(daysInMonth)]?.map((_, dayIndex) => {
              // Kiểm tra xem có lịch đặt nào bắt đầu vào ngày này không
              const booking = room.bookings.find((booking) => booking.startDay === dayIndex + 1);

              if (booking) {
                // Hiển thị một ô đặt phòng kéo dài trong nhiều ngày
                return (
                  <div
                    key={dayIndex}
                    className="calendar-booking"
                    style={{
                      gridColumn: `span ${booking.duration}`,
                    }}
                  >
                    {booking.name}
                  </div>
                );
              }
              // Hiển thị ô trống nếu không có lịch đặt nào bắt đầu vào ngày này
              return <div key={dayIndex} className="calendar-cell"></div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;
