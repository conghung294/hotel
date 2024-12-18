import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/CommonUtils';
import { getInfoCheckInByRoom } from '../../service/roomService';
import ModalBookingService from './ModalBookingService';
import ModalPayment from './ModalPayment';

const ModalCheckOut = ({ modalCheckOutOpen, setModalCheckOutOpen, room, getRoom }) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const [dataCheckIn, setDataCheckIn] = useState();
  const [openModalService, setOpenModalService] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

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
        return <div>{dayjs(record?.timeCome).format('HH:mm DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Trả phòng',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '15%',
      align: 'center',
      render: (_, record) => {
        return <div>{dayjs(record?.timeGo).format('HH:mm DD/MM/YYYY')}</div>;
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
      render: (_, record) => (
        <div>
          {formatCurrency(
            dayjs(record?.timeGo)
              .startOf('day')
              .diff(dayjs(record?.timeCome).startOf('day'), 'day') * record?.typeData?.price
          )}
        </div>
      ),
    },
  ];

  const getDataCheckIn = useCallback(async () => {
    const res = await getInfoCheckInByRoom(room?.id);
    if (res?.errCode === 0) {
      setDataCheckIn({ ...res.data, key: '1' });
    } else {
      toast.error(res.errMessage);
    }
  }, [room?.id]);

  const onFinish = async () => {
    setOpenModalPayment(true);
  };

  useEffect(() => {
    if (room?.status === '2' && modalCheckOutOpen === true) {
      getDataCheckIn();
    }
  }, [room, getDataCheckIn, modalCheckOutOpen]);

  useEffect(() => {
    if (dataCheckIn) {
      form.setFieldsValue(dataCheckIn?.bookingData);
    }
  }, [dataCheckIn, form]);

  return (
    <Modal
      title={'Trả phòng'}
      centered
      open={modalCheckOutOpen}
      onCancel={() => {
        setModalCheckOutOpen(false);
        setOpenModalPayment(false);
      }}
      maskClosable={false}
      className="!w-[80%]"
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setModalCheckOutOpen(false);
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
          Trả phòng
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={[dataCheckIn || room]} bordered pagination={false} />
      <Form
        name="formCheckOut"
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
        </div>
      </Form>

      <ModalBookingService
        modalOpen={openModalService}
        setModalOpen={setOpenModalService}
        bookingId={dataCheckIn?.id}
        getDataCheckIn={getDataCheckIn}
      />
      {openModalPayment && (
        <ModalPayment
          modalOpen={openModalPayment}
          setModalOpen={setOpenModalPayment}
          data={dataCheckIn}
          getRoom={getRoom}
          setModalCheckOutOpen={setModalCheckOutOpen}
        />
      )}
    </Modal>
  );
};

export default ModalCheckOut;
