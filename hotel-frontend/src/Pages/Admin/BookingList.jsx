import { ConfigProvider, DatePicker, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import { getBookingByStatusService } from '../../service/bookingService';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import viVN from 'antd/lib/locale/vi_VN';

const BookingList = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const columns = [
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
      align: 'center',
      render: (createdAt) => {
        return dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Khách đặt',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <div>
          <div>{record?.bookingData?.name}</div>
          <div>{record?.bookingData?.phoneNumber}</div>
        </div>
      ),
    },
    {
      title: 'Thời gian đến',
      dataIndex: 'timeCome',
      key: 'timeCome',
      width: '10%',
      align: 'center',
      render: (timeCome) => {
        return dayjs(timeCome).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '10%',
      align: 'center',
      render: (timeGo) => {
        return dayjs(timeGo).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'typeroom',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Tên phòng',
      dataIndex: ['roomData', 'name'],
      key: 'typeroom',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
      width: '20%',
      render: (_, record) => (
        <div>
          {record?.services?.map((item) => {
            return <div key={item?.id}>-{item?.name}</div>;
          })}
        </div>
      ),
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.price)}</div>,
    },
  ];

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const getBookings = useCallback(async () => {
    const res = await getBookingByStatusService('1');
    const dataWithKeys = res?.data
      .map((item, index) => ({ ...item, key: index }))
      .filter((item) => dayjs(item.timeCome).isSame(selectedMonth, 'month')); // Lọc các bản ghi có timeCome nằm trong tháng đã chọn
    setData(dataWithKeys);
  }, [selectedMonth]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <div className="">
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

      <Table columns={columns} dataSource={data} bordered className="mt-3" />
    </div>
  );
};

export default BookingList;
