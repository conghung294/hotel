/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { checkOutService, getInfoCheckInByRoom } from '../../service/roomService';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import { Bill } from '../Print/Bill';
import ModalBookingService from './ModalBookingService';

const ModalCheckOut = ({ modalOpen, setModalOpen, room, getRoom }) => {
  const [dataCheckIn, setDataCheckIn] = useState();
  const [openModalService, setOpenModalService] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const printRef = useRef(null);

  const columns = [
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'name',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Tên phòng',
      dataIndex: ['roomData', 'name'],
      key: 'status',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record?.typeData?.price)} / ngày</div>,
    },
    {
      title: 'Nhận phòng',
      dataIndex: 'timeCome',
      key: 'timeCome',
      width: '15%',
      align: 'center',
      render: (_, record) => {
        return <div>{dayjs(record?.timeCome).format('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Trả phòng',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '15%',
      align: 'center',
      render: (_, record) => {
        return <div>{dayjs(record?.timeGo).format('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'totalTime',
      key: 'totalTime',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <div>
          {dayjs(record?.timeGo).startOf('day').diff(dayjs(record?.timeCome).startOf('day'), 'day')}
          <span className="ml-1">ngày</span>
        </div>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record?.price)}</div>,
    },
  ];

  const handleAfterPrint = React.useCallback(() => {
    toast.success('Trả phòng thành công!');
    setModalOpen(false);
    getRoom();
  }, [getRoom, setModalOpen]);

  const handleBeforePrint = React.useCallback(() => {
    return Promise.resolve();
  }, []);

  const getDataCheckIn = useCallback(async () => {
    const res = await getInfoCheckInByRoom(room?.id);
    if (res?.errCode === 0) {
      setDataCheckIn({ ...res.data, key: '1' });
    } else {
      toast.error(res.errMessage);
    }
  }, [room?.id]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Hóa Đơn Thanh Toán',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const onFinish = async () => {
    try {
      const res = await checkOutService({
        bookingId: dataCheckIn?.id,
        roomId: dataCheckIn?.roomId,
      });
      if (res.errCode === 0) {
        handlePrint(); // Gọi hàm in
      } else {
        toast.error('Thất bại!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (room?.status === 'ĐANG SỬ DỤNG' && modalOpen === true) {
      getDataCheckIn();
    }
  }, [room, getDataCheckIn, modalOpen]);

  useEffect(() => {
    if (dataCheckIn) {
      form.setFieldsValue(dataCheckIn?.bookingData);
    }
  }, [dataCheckIn, form]);

  console.log(dataCheckIn);

  return (
    <Modal
      title={'Trả phòng'}
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[80%]"
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setModalOpen(false);
            setDataCheckIn(null);
          }}
        >
          Hủy bỏ
        </Button>,
        <Button
          key="extra"
          type="primary"
          className="bg-green-600 hover:!bg-green-500"
          onClick={() => setOpenModalService(true)}
        >
          Thêm dịch vụ
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Trả phòng và thanh toán
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={[dataCheckIn || room]} bordered pagination={false} />
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        labelAlign="left"
      >
        <div className="flex px-10 mt-10 gap-10">
          <div className="w-[50%]">
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="CCCD"
              name="cccd"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập CCCD!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="w-[50%]">
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="hidden">
            <Bill ref={printRef} data={dataCheckIn} />
          </div>
        </div>
      </Form>

      <ModalBookingService
        modalOpen={openModalService}
        setModalOpen={setOpenModalService}
        bookingId={dataCheckIn?.id}
      />
    </Modal>
  );
};

export default ModalCheckOut;
