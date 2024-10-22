/* eslint-disable react/prop-types */
import { Modal, Popconfirm, Space, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { VscQuestion } from 'react-icons/vsc';
import { deleteBookingService, getBookingByStatusService } from '../../service/bookingService';
import { formatCurrency } from '../../utils/CommonUtils';
import ModalConfirmBooking from './ModalConfirmBooking';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ModalWaitConfirm = ({ modalOpen, setModalOpen, setCount }) => {
  const [bookingConfirm, setBookingConfirm] = useState([]);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [choiceBooking, setChoiceBooking] = useState();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOpenModalConfirmBooking = (booking) => {
    setChoiceBooking(booking);
    setOpenModalConfirm(true);
  };

  const deleteBooking = async (id) => {
    await deleteBookingService(id);
    getBookingWaitConfirm();
  };

  const columns = [
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '5%',
      align: 'center',
      render: (createdAt) => {
        return moment(createdAt).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Khách đặt',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
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
        return moment(timeCome).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '10%',
      align: 'center',
      render: (timeGo) => {
        return moment(timeGo).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'typeroom',
      width: '20%',
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
      width: '8%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.price)}</div>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <FaCheck
            onClick={() => handleOpenModalConfirmBooking(record)}
            className="cursor-pointer"
          />
          {/* <MdOutlineEdit className="cursor-pointer" /> */}
          <Popconfirm
            title="Xóa đơn đặt phòng"
            description={`Bạn có chắc chắn muốn xóa đơn đặt phòng này?`}
            placement="topRight"
            icon={
              <div className="mt-[2px] pr-1">
                <VscQuestion size={20} style={{ color: 'red' }} />
              </div>
            }
            onConfirm={() => deleteBooking(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <div>
              <RiDeleteBin6Line className="cursor-pointer" />
            </div>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getBookingWaitConfirm = async () => {
    const res = await getBookingByStatusService('0');
    const dataWithKeys = res?.data.map((item, index) => {
      return { ...item, key: index };
    });
    setBookingConfirm(dataWithKeys);
  };

  useEffect(() => {
    getBookingWaitConfirm();
  }, []);

  useEffect(() => {
    setCount(bookingConfirm.length);
  }, [bookingConfirm, setCount]);

  return (
    <>
      <Modal
        title={'Khách đặt phòng (Chờ xác nhận)'}
        centered
        open={modalOpen}
        onCancel={() => handleCancel()}
        maskClosable={false}
        footer={null}
        className="!w-[90%]"
      >
        <Table
          columns={columns}
          dataSource={bookingConfirm}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </Modal>

      <ModalConfirmBooking
        centered
        modalOpen={openModalConfirm}
        setModalOpen={setOpenModalConfirm}
        maskClosable={false}
        choiceBooking={choiceBooking}
      />
    </>
  );
};

export default ModalWaitConfirm;
