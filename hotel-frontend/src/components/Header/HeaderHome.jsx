import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';

const { Header } = Layout;

const HeaderHome = () => {
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

        <Link to="/login" className="">
          <Button type="primary" size="large" className="login-btn">
            Đăng nhập
          </Button>
        </Link>
      </div>
    </Header>
  );
};

export default HeaderHome;
