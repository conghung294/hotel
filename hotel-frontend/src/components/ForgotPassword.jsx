import { Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';
import { handleForgotPassword } from '../service/userService';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword = () => {
  const submit = async (values) => {
    const res = await handleForgotPassword(values);
    if (res?.errCode === 0) {
      toast.success('Đã gửi email đến bạn. Vui lòng kiểm tra hộp thư!');
    } else {
      toast.error(res?.errMessage);
    }
  };

  return (
    <div className="flex items-center justify-center home-background">
      <div className="w-[400px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
        <Title level={2} className="text-center">
          Quên mật khẩu
        </Title>
        <Form onFinish={submit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="mt-3">
              Gửi yêu cầu đặt lại mật khẩu
            </Button>
            <Button className="mt-4" block>
              <Link className="h-full w-full" to={'/login'}>
                Hủy
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
