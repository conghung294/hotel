import { Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import 'yet-another-react-lightbox/styles.css';

import './Modal.scss';
import { createNewUserService, editUserService } from '../../service/userService';

const ModalUser = ({ modalOpen, setModalOpen, getUser, action, currentUser, role }) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      let res;
      if (action === 'CREATE') {
        res = await createNewUserService({ ...values });
      } else {
        res = await editUserService({
          ...values,
          id: currentUser.id,
        });
      }

      if (res.errCode === 0) {
        form.resetFields();
        setModalOpen(false);
        toast.success(action === 'CREATE' ? 'Thêm thành công!' : 'Cập nhật thành công!');
        getUser();
      } else {
        toast.error(res?.errMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue(currentUser);
    } else {
      form.resetFields();
    }
  }, [currentUser, form]);

  return (
    <Modal
      title={action === 'CREATE' ? 'Thêm người dùng' : 'Cập nhật người dùng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        labelAlign="left"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          <Input disabled={action === 'EDIT'} />
        </Form.Item>
        {action === 'CREATE' && (
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
              {
                min: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="Họ và tên" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="CCCD" name="cccd">
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

        {role !== 'customer' && (
          <Form.Item
            label="Chức vụ"
            name="role"
            rules={[
              {
                required: true,

                message: 'Vui lòng chọn chức vụ!',
              },
            ]}
          >
            <Select placeholder="Chọn chức vụ">
              <Option value="Quản lý">Quản lý</Option>
              <Option value="Lễ tân">Lễ tân</Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalUser;
