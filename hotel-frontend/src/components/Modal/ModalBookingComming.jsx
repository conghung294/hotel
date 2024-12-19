import { Form, Input, Modal, Select, Table } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import DatePickerCustom from '../DatePickerCustom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import { checkInService } from '../../service/roomService';
import { toast } from 'react-toastify';
import { BookingForm } from '../Print/BookingForm';
import { useReactToPrint } from 'react-to-print';

const ModalBookingComming = ({ modalOpen, setModalOpen, room, getRoom }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const printRef = useRef(null);
  // Sử dụng useMemo để cập nhật columns khi timeCome hoặc timeGo thay đổi
  const columns = useMemo(
    () => [
      {
        title: 'Loại phòng',
        dataIndex: ['roomtypeData', 'name'],
        key: 'name',
        width: '20%',
        align: 'center',
      },
      {
        title: 'Tên phòng',
        dataIndex: 'name',
        key: 'status',
        width: '15%',
        align: 'center',
      },
      {
        title: 'Giá',
        dataIndex: ['roomtypeData', 'price'],
        key: 'price',
        width: '15%',
        align: 'center',
        render: (_, record) => <div>{formatCurrency(record?.roomtypeData?.price)} / ngày</div>,
      },
      {
        title: 'Nhận phòng',
        dataIndex: 'timeCome',
        key: 'timeCome',
        width: '15%',
        align: 'center',
        render: (_, record) => (
          <div className="h-[40px]">
            <DatePickerCustom date={dayjs(record?.roomData[0]?.timeCome)} disabled={true} />
          </div>
        ),
      },
      {
        title: 'Trả phòng',
        dataIndex: 'timeGo',
        key: 'timeGo',
        width: '15%',
        align: 'center',
        render: (_, record) => (
          <div className="h-[40px]">
            <DatePickerCustom date={dayjs(record?.roomData[0]?.timeGo)} disabled={true} />
          </div>
        ),
      },
      {
        title: 'Dự kiến',
        dataIndex: 'totalTime',
        key: 'totalTime',
        width: '10%',
        align: 'center',
        render: (_, record) => (
          <div>
            {dayjs(record?.roomData[0]?.timeGo)
              .startOf('day')
              .diff(dayjs(record?.roomData[0]?.timeCome).startOf('day'), 'day')}
            <span className="ml-1">ngày</span>
          </div>
        ),
      },
      {
        title: 'Thành tiền',
        dataIndex: ['roomtypeData', 'price'],
        key: 'price',
        width: '10%',
        align: 'center',
        render: (_, record) => {
          const totalDays = dayjs(record?.roomData[0]?.timeGo)
            .startOf('day')
            .diff(dayjs(record?.roomData[0]?.timeCome).startOf('day'), 'day');
          const totalPrice = totalDays * (record?.roomtypeData?.price || 0);
          return <div>{formatCurrency(totalPrice)}</div>;
        },
      },
    ],
    []
  );

  const onFinish = async (value) => {
    const res = await checkInService({
      bookingId: room?.roomData[0]?.id,
      user: value,
      userId: room?.roomData[0]?.userId,
      roomId: room?.id,
    });

    if (res.errCode === 0) {
      handlePrint();
      // toast.success('Nhận phòng thành công!');
      // setModalOpen(false);
      // getRoom();
    } else {
      toast.error('Thất bại!');
    }
  };

  const handleAfterPrint = useCallback(() => {
    form.resetFields();
    setModalOpen(false);
    toast.success('Nhận phòng thành công!');
    getRoom();
  }, [form, getRoom, setModalOpen]);

  const handleBeforePrint = useCallback(() => {
    return Promise.resolve();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Phiếu Đặt Phòng',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  useEffect(() => {
    if (room) {
      form.setFieldsValue(room?.roomData[0]?.bookingData);
    }
  }, [room, form]);

  return (
    <Modal
      title={'Nhận phòng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={() => {
        setModalOpen(false);
        form.resetFields();
      }}
      maskClosable={false}
      className="!w-[80%]"
      okText="Nhận phòng"
      cancelText="Hủy bỏ"
    >
      <Table columns={columns} dataSource={[room]} bordered pagination={false} />
      <Form
        name="formBookingComing"
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
            <Form.Item label="Họ và tên" name="name">
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
      <div className="hidden">
        <BookingForm
          ref={printRef}
          data={{ ...room, ...room?.roomData[0], user: room?.roomData[0]?.bookingData }}
        />
      </div>
    </Modal>
  );
};

export default ModalBookingComming;
