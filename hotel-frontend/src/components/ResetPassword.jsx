import { Link, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';
import { handleResetPassword } from '../service/userService';

const { Title } = Typography;

function ResetPassword() {
  const { token } = useParams();
  const submit = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    const res = await handleResetPassword({ token, newPassword });
    if (res?.errCode === 0) {
      toast.success('Cập nhật mật khẩu thành công!');
    } else {
      toast.error(res?.errMessage);
    }
  };

  return (
    <div className="flex items-center justify-center home-background">
      <div className="w-[400px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
        <Title level={2} className="text-center">
          Đặt lại mật khẩu
        </Title>
        <Form onFinish={submit} layout="vertical">
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đặt lại mật khẩu
            </Button>
            <Button className="mt-4" block>
              <Link className="h-full w-full" to={'/login'}>
                Đăng nhập
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
