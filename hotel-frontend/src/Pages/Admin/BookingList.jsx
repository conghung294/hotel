import { ConfigProvider, DatePicker, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import { getBookingService } from '../../service/bookingService';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import viVN from 'antd/lib/locale/vi_VN';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const BookingList = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const columns = [
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '8%',
      align: 'center',
      render: (createdAt) => {
        return dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Khách đặt',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
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
      width: '8%',
      align: 'center',
      render: (timeCome) => {
        return dayjs(timeCome).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '8%',
      align: 'center',
      render: (timeGo) => {
        return dayjs(timeGo).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'typeroom',
      width: '14%',
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
      width: '15%',
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
      width: '8%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.price)}</div>,
    },
    {
      title: 'Đã trả',
      dataIndex: 'paid',
      key: 'paid',
      width: '8%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record?.paid)}</div>,
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '12%',
      align: 'center',
      render: (_, record) => (
        <div>
          {record?.status === '3'
            ? 'ĐÃ THANH TOÁN'
            : record?.status === '2'
            ? 'ĐANG SỬ DỤNG'
            : 'ĐẶT TRƯỚC'}
        </div>
      ),
    },
  ];

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const getBookings = useCallback(async () => {
    const res = await getBookingService('ALL');
    const dataWithKeys = res?.data
      ?.map((item, index) => ({ ...item, key: index }))
      ?.filter((item) => dayjs(item.timeCome).isSame(selectedMonth, 'month')); // Lọc các bản ghi có timeCome nằm trong tháng đã chọn
    setData(dataWithKeys);
  }, [selectedMonth]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  useEffect(() => {
    socket.on('confirmSuccess', () => {
      getBookings();
    });

    return () => {
      socket.off('confirmSuccess');
    };
  }, [getBookings]);

  return (
    <div id="booking-list">
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

      <Table
        columns={columns}
        dataSource={data}
        bordered
        className="mt-3"
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default BookingList;
