import { Form, Input, Modal, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { editUserService, getAllUsers } from '../../service/userService';
import { UserContext } from '../../context/UserContext';

const ModalInfo = ({ modalOpen, setModalOpen }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState();

  const onFinish = async (values) => {
    const res = await editUserService({ ...values, id: user.id });
    if (res.errCode === 0) {
      setModalOpen(false);
      toast.success('Lưu thông tin thành công');
    } else {
      toast.error('Lưu thông tin thất bại');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getAllUsers(user?.id);
      setUserInfo(res.data);
    };
    getUser();
  }, [user?.id]);

  return (
    <Modal
      title={'Thông tin cá nhân'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[40%]"
      okText="Lưu thông tin"
      cancelText="Hủy bỏ"
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        labelAlign="left"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={userInfo}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng email!',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item label="Họ và tên" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Select placeholder="Chọn giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalInfo;
