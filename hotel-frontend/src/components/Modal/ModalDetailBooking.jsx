import { Button, Modal, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { formatCurrency } from '../../utils/CommonUtils';
import { cancelBookingService, getBookingByIdService } from '../../service/bookingService';
import { VscQuestion } from 'react-icons/vsc';

const ModalDetailBooking = ({ modalOpen, setModalOpen, id, getBookingSchedule }) => {
  const [bookingDetails, setBookingDetails] = useState();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleCancelBooking = async (record) => {
    await cancelBookingService(record);
    setModalOpen(false);
    getBookingSchedule();
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
      width: '14%',
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
      render: (_, record) => <div>{formatCurrency(record.paid)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '9%',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center">
          {record?.status === '3' ? (
            <Tag color="success">ĐÃ THANH TOÁN</Tag>
          ) : record?.status === '2' ? (
            <Tag color="warning">ĐANG SỬ DỤNG</Tag>
          ) : (
            <Tag color="processing">ĐẶT TRƯỚC</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '7%',
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Hủy đơn đặt phòng"
          description={`Bạn có chắc chắn muốn hủy đơn đặt phòng này không?`}
          placement="topRight"
          icon={
            <div className="mt-[2px] pr-1">
              <VscQuestion size={20} style={{ color: 'red' }} />
            </div>
          }
          onConfirm={() => handleCancelBooking(record)}
          okText="Hủy phòng"
          cancelText="Không"
        >
          <Button type="primary" danger disabled={record?.status !== '1'}>
            Hủy phòng
          </Button>
        </Popconfirm>
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
