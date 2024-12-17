import { Modal, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { formatCurrency } from '../../utils/CommonUtils';
import { getBookingByIdService } from '../../service/bookingService';

const ModalDetailBooking = ({ modalOpen, setModalOpen, id }) => {
  const [bookingDetails, setBookingDetails] = useState();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const columns = [
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '9%',
      align: 'center',
      render: (createdAt) => {
        return moment(createdAt).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Khách đặt',
      dataIndex: 'name',
      key: 'name',
      width: '13%',
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
        return moment(timeCome).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '9%',
      align: 'center',
      render: (timeGo) => {
        return moment(timeGo).format('HH:mm:ss DD/MM/YYYY');
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
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
      width: '15%',
      render: (_, record) => (
        <div>
          {record?.services?.length > 0 ? (
            record.services.map((item) => <div key={item?.id}>-{item?.name}</div>)
          ) : (
            <div>Không có</div>
          )}
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
    {
      title: 'Đã trả',
      dataIndex: 'paid',
      key: 'paid',
      width: '10%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.paid)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '10%',
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

  useEffect(() => {
    const getBookingDetails = async () => {
      const res = await getBookingByIdService(id);
      const dataWithKeys = res?.data?.map((item, index) => {
        return { ...item, key: index };
      });
      setBookingDetails(dataWithKeys);
    };
    if (id) {
      getBookingDetails();
    }
  }, [id]);

  return (
    <>
      <Modal
        title={'Thông tin đặt phòng'}
        centered
        open={modalOpen}
        onCancel={() => handleCancel()}
        maskClosable={false}
        footer={null}
        className="!w-[90%]"
      >
        <Table columns={columns} dataSource={bookingDetails} bordered pagination={false} />
      </Modal>
    </>
  );
};

export default ModalDetailBooking;
