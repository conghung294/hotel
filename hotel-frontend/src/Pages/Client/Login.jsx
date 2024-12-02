import { Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import { handleLoginApi } from '../../service/userService';
import { useUser } from '../../context/UserContext';
import './Home.scss';

const Login = () => {
  const navigate = useNavigate();
  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };

  //Tối thiểu tám ký tự, ít nhất một chữ cái và một số:
  // const validatePassword = (password) => {
  //   return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  // };
  const { setUser } = useUser();

  const onFinish = async (data) => {
    const res = await handleLoginApi(data.email, data.password);
    if (res?.errCode === 0) {
      localStorage.setItem('accessToken', res.data?.accessToken);
      setUser(res.user);

      if (res?.user?.roleId === 'Quản lý') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      toast.success('Đăng nhập thành công!');
    } else {
      toast.error('Đăng nhập thất bại!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center h-[100vh] home-background">
      <div className="bg-white py-6 px-4 border rounded-md w-[400px]">
        {/* <div className="flex justify-center pt-2 pb-4 font-bold text-lg">Đăng nhập</div> */}
        <Form
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Vui lòng nhập đúng định dạng email!',
              },
            ]}
          >
            <Input className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input.Password className="login-input" />
          </Form.Item>

          {/* 
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <button className="btn-login" type="submit">
            Đăng nhập
          </button>

          <div className="mt-4 flex justify-center">
            Nếu bạn chưa có tài khoản?
            <Link to={'/register'} className="text-blue-600 underline ml-2">
              Đăng ký tài khoản
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <Link to={'/forgot-password'} className="text-blue-600 underline ml-2">
              Quên mật khẩu
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
