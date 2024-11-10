import { Tabs } from 'antd';
import BookingList from './BookingList';
import BookingCalendar from './BookingCalendar';

const items = [
  {
    key: '1',
    label: 'Danh sách',
    children: <BookingList />,
  },
  {
    key: '2',
    label: 'Lưới',
    children: <BookingCalendar />,
  },
];

const BookingSchedule = () => {
  return (
    <div className="mt-6 px-10">
      {/* <div className="font-bold text-lg">Danh sách đặt phòng</div> */}
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default BookingSchedule;
