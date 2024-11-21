/* eslint-disable react/prop-types */
import { Form, Modal } from 'antd';
import { useEffect } from 'react';

import { useUser } from '../../context/UserContext';

const ModalHistoryBooking = ({ modalOpen, setModalOpen }) => {
  const [form] = Form.useForm();
  const { user } = useUser();

  useEffect(() => {
    const getUser = async () => {};
    getUser();
  }, [user?.id]);

  return (
    <Modal
      title={'Lịch sử đặt phòng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[40%]"
      okText="Lưu thông tin"
      cancelText="Hủy bỏ"
    ></Modal>
  );
};

export default ModalHistoryBooking;
