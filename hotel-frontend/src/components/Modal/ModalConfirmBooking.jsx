import { Form, Modal, Select } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getRoomServiceAvailable } from '../../service/roomService';
import { editBookingService } from '../../service/bookingService';
import { toast } from 'react-toastify';

const ModalConfirmBooking = ({ modalOpen, setModalOpen, choiceBooking, getBookingWaitConfirm }) => {
  const { Option } = Select;
  const [rooms, setRooms] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res = await editBookingService({
      ...values,
      status: '1',
      id: choiceBooking.id,
      data: choiceBooking,
    });
    if (res.errCode === 0) {
      setModalOpen(false);
      getBookingWaitConfirm();
      toast.success('Xác nhận đặt phòng thành công!');
    } else {
      toast.error(res.errMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const getRoomAvailable = async () => {
      if (choiceBooking?.typeroomId && choiceBooking?.timeCome && choiceBooking?.timeGo) {
        const res = await getRoomServiceAvailable(
          choiceBooking?.typeroomId,
          choiceBooking?.timeCome,
          choiceBooking?.timeGo
        );
        setRooms(res.data);
      }
    };

    getRoomAvailable();
  }, [choiceBooking?.typeroomId, choiceBooking?.timeCome, choiceBooking?.timeGo]);

  return (
    <Modal
      title={'Xác nhận đặt phòng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[50%]"
      okText="Xác nhận"
      cancelText="Hủy bỏ"
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        labelAlign="left"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <hr />
        <div className="font-bold mt-2">Thông tin khách hàng</div>
        <div className="flex my-2">
          <div className="w-[30%] flex flex-col gap-2">
            <div>Tên khách hàng: </div>
            <div>Email: </div>
            <div>SĐT: </div>
            <div>Địa chỉ: </div>
            <div>Giới tính: </div>
          </div>
          <div className="w-[70%] flex flex-col gap-2">
            <div>{choiceBooking?.bookingData?.name || 'Không có'}</div>
            <div>{choiceBooking?.bookingData?.email || 'Không có'}</div>
            <div>{choiceBooking?.bookingData?.phoneNumber || 'Không có'}</div>
            <div>{choiceBooking?.bookingData?.address || 'Không có'}</div>
            <div>{choiceBooking?.bookingData?.gender || 'Không có'}</div>
          </div>
        </div>
        <hr />
        <div className="font-bold mt-2">Thông tin đặt phòng</div>
        <div className="flex mt-2">
          <div className="w-[30%] flex flex-col gap-2">
            <div>Thời gian đặt phòng: </div>
            <div>Loại phòng: </div>
            <div>Giá phòng: </div>
            <div>Thời gian đến: </div>
            <div>Thời gian đi: </div>
          </div>
          <div className="w-[70%] flex flex-col gap-2">
            <div>{moment(choiceBooking?.createdAt).format('HH:mm:ss DD/MM/YYYY')}</div>
            <div>{choiceBooking?.typeData?.name}</div>
            <div>{formatCurrency(choiceBooking?.typeData?.price)}</div>
            <div>{moment(choiceBooking?.timeCome).format('DD/MM/YYYY')}</div>
            <div>{moment(choiceBooking?.timeGo).format('DD/MM/YYYY')}</div>
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-[30%]">
            <div>Dịch vụ: </div>
          </div>
          <div className="w-[70%] flex flex-col justify-center">
            {choiceBooking?.services?.length > 0 ? (
              choiceBooking.services.map((item) => (
                <div key={item?.id} className="mt-2">{`-${item?.name} ( ${formatCurrency(
                  item?.price
                )} )`}</div>
              ))
            ) : (
              <div>Không có</div>
            )}
          </div>
        </div>

        <div className="flex my-2">
          <div className="w-[30%]">
            <div>Tổng cộng: </div>
          </div>
          <div className="w-[70%]">
            <div>{formatCurrency(choiceBooking?.price)}</div>
          </div>
        </div>
        <hr />

        <Form.Item
          label="Chọn phòng"
          name="roomId"
          className="mt-3"
          rules={[{ required: true, message: 'Vui lòng chọn phòng còn trống!' }]}
        >
          <Select placeholder="Chọn ">
            {rooms?.map((room) => {
              return (
                <Option value={room?.id} key={room?.id}>
                  {room?.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalConfirmBooking;
