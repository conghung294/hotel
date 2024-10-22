import { Button, Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import { createNewUserService } from '../service/userService';
import './Home.scss';

const Register = () => {
  const nagivate = useNavigate();
  const { Option } = Select;

  const onFinish = async (values) => {
    let res = await createNewUserService(values);
    if (res.errCode === 0) {
      nagivate('/login');
      toast.success('Đăng ký thành công!');
    } else {
      toast.error(res.errMessage);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="flex items-center justify-center h-[100vh] bg-[#ccc] home-background ">
      <div className="w-[400px] bg-[rgba(255,255,255,0.9)] px-4 py-4 rounded-md ">
        <div className="flex justify-center font-bold text-lg pb-4 text-black">
          Đăng ký tài khoản
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input.Password />
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

          <div className="flex justify-center">
            <Button type="primary" htmlType="submit" className="px-20 py-5 font-bold">
              Đăng ký
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-black pr-2">Bạn đã có tài khoản?</span>
            <Link to={'/login'} className=" text-blue-600 underline">
              Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
