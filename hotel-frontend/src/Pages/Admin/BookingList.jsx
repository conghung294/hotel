import { ConfigProvider, DatePicker, Table, Tag } from 'antd';
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
      title: 'Mã ĐP',
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (_, record) => <div>{record?.id}</div>,
    },
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
      width: '9%',
      align: 'center',
      render: (timeCome) => {
        return dayjs(timeCome).format('HH:mm:ss DD/MM/YYYY');
      },
      // sorter: (a, b) => dayjs(a.timeCome).valueOf() - dayjs(b.timeCome).valueOf(),
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '9%',
      align: 'center',
      render: (timeGo) => {
        return dayjs(timeGo).format('HH:mm:ss DD/MM/YYYY');
      },
      // sorter: (a, b) => dayjs(a.timeGo).valueOf() - dayjs(b.timeGo).valueOf(),
    },
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'typeroom',
      width: '9%',
      align: 'center',
    },
    {
      title: 'Tên phòng',
      dataIndex: ['roomData', 'name'],
      key: 'typeroom',
      width: '10%',
      align: 'center',
    },
    // {
    //   title: 'Dịch vụ',
    //   dataIndex: 'service',
    //   key: 'service',
    //   width: '13%',
    //   render: (_, record) => (
    //     <div>
    //       {record?.services?.length > 0 ? (
    //         record.services.map((item) => (
    //           <div key={item?.id}>
    //             <div className="flex items-center">
    //               <LuDot size={20} /> {item?.name}
    //             </div>
    //           </div>
    //         ))
    //       ) : (
    //         <div>Không có</div>
    //       )}
    //     </div>
    //   ),
    // },
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
          {record?.status === '4' ? (
            <Tag color="error">ĐÃ HỦY</Tag>
          ) : record?.status === '3' ? (
            <Tag color="success">ĐÃ THANH TOÁN</Tag>
          ) : record?.status === '2' ? (
            <Tag color="warning">ĐANG SỬ DỤNG</Tag>
          ) : (
            <Tag color="processing">ĐẶT TRƯỚC</Tag>
          )}
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
