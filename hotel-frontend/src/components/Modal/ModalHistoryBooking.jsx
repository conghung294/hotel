import { Modal, Table } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';

import { UserContext } from '../../context/UserContext';
import { formatCurrency } from '../../utils/CommonUtils';
import dayjs from 'dayjs';
import { getBookingService } from '../../service/bookingService';

const ModalHistoryBooking = ({ modalOpen, setModalOpen }) => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
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
          {record?.status === '0'
            ? 'CHỜ XÁC NHẬN'
            : record?.status === '1'
            ? 'ĐÃ XÁC NHẬN'
            : record?.status === '2'
            ? 'ĐANG SỬ DỤNG'
            : record?.status === '3'
            ? 'HOÀN THÀNH'
            : ''}
        </div>
      ),
    },
  ];

  const getBookings = useCallback(async () => {
    const res = await getBookingService(user?.id);
    const dataWithKeys =
      res?.data?.length > 0 && res?.data?.map((item, index) => ({ ...item, key: index }));

    setData(dataWithKeys);
  }, [user?.id]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <Modal
      title={'Lịch sử đặt phòng'}
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[80%]"
      footer={false}
    >
      <Table
        columns={columns}
        dataSource={data}
        bordered
        className="mt-3"
        pagination={{ pageSize: 4 }}
      />
    </Modal>
  );
};

export default ModalHistoryBooking;
