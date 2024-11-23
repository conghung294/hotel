import { Tabs } from 'antd';
import BookingList from './BookingList';
import BookingCalendar from './BookingCalendar';
import BookingDiagram from './BookingDiagram';
import { CiViewList, CiViewTable } from 'react-icons/ci';
import { PiDeviceTablet } from 'react-icons/pi';
import { useState } from 'react';

const items = [
  {
    key: '1',
    label: (
      <div className="flex items-center justify-center gap-2">
        <CiViewList size={20} /> Danh sách
      </div>
    ),
    children: <BookingList />,
  },
  {
    key: '2',
    label: (
      <div className="flex items-center justify-center gap-2">
        <CiViewTable size={20} /> Lưới
      </div>
    ),
    children: <BookingCalendar />,
  },
  {
    key: '3',
    label: (
      <div className="flex items-center justify-center gap-2">
        <PiDeviceTablet size={20} /> Sơ đồ
      </div>
    ),
    children: <BookingDiagram />,
  },
];

const BookingSchedule = () => {
  const [activeTab, setActiveTab] = useState('1'); // Lưu trạng thái tab hiện tại

  const handleTabChange = (key) => {
    setActiveTab(key);

    // Nếu chuyển sang tab "Danh sách", gọi API để refresh dữ liệu
    if (key === '1') {
      const bookingListComponent = document.querySelector('#booking-list');
      if (bookingListComponent?.reloadData) {
        bookingListComponent.reloadData(); // Gọi hàm reload trong BookingList
      }
    } else if (key === '2') {
      const bookingCalenderComponent = document.querySelector('#booking-calender');
      if (bookingCalenderComponent?.reloadData) {
        bookingCalenderComponent.reloadData(); // Gọi hàm reload trong BookingList
      }
    } else if (key === '3') {
      const bookingDiagramComponent = document.querySelector('#booking-diagram');
      if (bookingDiagramComponent?.reloadData) {
        bookingDiagramComponent.reloadData(); // Gọi hàm reload trong BookingList
      }
    }
  };

  return (
    <div className="mt-6 px-10">
      <Tabs defaultActiveKey="1" items={items} activeKey={activeTab} onChange={handleTabChange} />
    </div>
  );
};

export default BookingSchedule;
