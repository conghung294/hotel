import { Form, Input, Modal, Select, Table } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import DatePickerCustom from '../DatePickerCustom';
import { useState, useMemo, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { checkInService, getRoomServiceAvailable } from '../../service/roomService';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import { BookingForm } from '../Print/BookingForm';

const ModalCheckIn = ({ modalOpen, setModalOpen, room, getRoom }) => {
  const printRef = useRef(null);
  const [timeCome, setTimeCome] = useState(dayjs().startOf('day'));
  const [timeGo, setTimeGo] = useState(dayjs().startOf('day').add(1, 'day'));
  const [customer, setCustomer] = useState();
  const { Option } = Select;
  const [form] = Form.useForm();
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
        render: () => (
          <div className="h-[40px]">
            <DatePickerCustom date={timeCome} setDate={setTimeCome} disabled={true} />
          </div>
        ),
      },
      {
        title: 'Trả phòng',
        dataIndex: 'timeGo',
        key: 'timeGo',
        width: '15%',
        align: 'center',
        render: () => (
          <div className="h-[40px]">
            <DatePickerCustom date={timeGo} setDate={setTimeGo} />
          </div>
        ),
      },
      {
        title: 'Dự kiến',
        dataIndex: 'totalTime',
        key: 'totalTime',
        width: '10%',
        align: 'center',
        render: () => <div>{dayjs(timeGo).diff(dayjs(timeCome), 'day')} ngày</div>,
      },
      {
        title: 'Thành tiền',
        dataIndex: ['roomtypeData', 'price'],
        key: 'price',
        width: '10%',
        align: 'center',
        render: (_, record) => {
          const totalDays = dayjs(timeGo).diff(dayjs(timeCome), 'day');
          const totalPrice = totalDays * (record?.roomtypeData?.price || 0);
          return <div>{formatCurrency(totalPrice)}</div>;
        },
      },
    ],
    [timeCome, timeGo]
  ); // dependencies đảm bảo columns sẽ được cập nhật khi timeCome hoặc timeGo thay đổi

  const onFinish = async (value) => {
    setCustomer(value);
    const res = await getRoomServiceAvailable(room?.typeId, timeCome, timeGo);
    if (res?.errCode === 0) {
      const roomsAvail = res.data;
      const check = roomsAvail.some((item) => item.id === room.id);
      if (check) {
        const data = {
          user: value,
          roomId: room?.id,
          typeroomId: room?.typeId,
          timeCome: timeCome,
          timeGo: timeGo,
          price: dayjs(timeGo).diff(dayjs(timeCome), 'day') * room?.roomtypeData?.price,
          status: '1',
        };

        const res = await checkInService(data);

        if (res.errCode === 0) {
          handlePrint();
        } else {
          toast.error('Thất bại!');
        }
      } else {
        toast.error('Đã có người đặt phòng trong khoảng thời gian này!');
      }
    } else {
      toast.error(res?.errMessage);
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

  return (
    <Modal
      title={'Nhận phòng nhanh'}
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
        name="formCheckIn"
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
      <div className="hidden">
        <BookingForm ref={printRef} data={{ ...room, timeCome, timeGo, user: customer }} />
      </div>
    </Modal>
  );
};

export default ModalCheckIn;
