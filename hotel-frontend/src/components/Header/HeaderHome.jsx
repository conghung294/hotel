import { Layout, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useUser } from '../../context/UserContext';

const { Header } = Layout;

const HeaderHome = () => {
  const { user } = useUser();
  // Hàm lấy chữ cái đầu từ từ cuối cùng của tên người dùng
  const getInitial = (name) => {
    if (!name) return '';
    const words = name.trim().split(' '); // Tách tên thành mảng từ, loại bỏ khoảng trắng thừa
    return words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu của từ cuối cùng
  };

  return (
    <Header className="header z-10">
      <Link className="logo" to={'/'}>
        HotelBooking
      </Link>

      <div className="header-right flex gap-4 items-center">
        {/* <Link to="/room-types" className="text-white">
          Hạng phòng
        </Link> */}

        <Link to={'/booking'}>
          <Button size="large" className="booking-btn">
            Đặt phòng
          </Button>
        </Link>

        {user ? (
          <Avatar size={36} className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
            {getInitial(user.name)}
          </Avatar>
        ) : (
          <Link to="/login" className="">
            <Button type="primary" size="large" className="login-btn">
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </Header>
  );
};

export default HeaderHome;
