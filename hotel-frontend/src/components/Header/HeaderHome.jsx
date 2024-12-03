import { Layout, Button, Avatar, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import './Header.scss';
import { UserContext } from '../../context/UserContext';
import ModalInfo from '../Modal/ModalInfo';
import ModalHistoryBooking from '../Modal/ModalHistoryBooking';
import { CiUser } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { handleLogoutApi } from '../../service/userService';

const { Header } = Layout;

const HeaderHome = () => {
  const nagivate = useNavigate();
  const { logoutContext } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [openModalInfo, setOpenModalInfo] = useState();
  const [openModalBookingHistory, setOpenModalBookingHistory] = useState(false);

  // Hàm lấy chữ cái đầu từ từ cuối cùng của tên người dùng
  const getInitial = (name) => {
    if (!name) return '';
    const words = name.trim().split(' '); // Tách tên thành mảng từ, loại bỏ khoảng trắng thừa
    return words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu của từ cuối cùng
  };

  const handleLogout = async () => {
    logoutContext();
    await handleLogoutApi();
    localStorage.removeItem('accessToken');
    nagivate('/login');
  };

  // const handleOpenModalInfo = () => {
  //   setOpenModalInfo(true);
  // };

  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => nagivate('/personal-info')} className="flex items-center gap-2">
          <CiUser size={20} />
          Thông tin cá nhân
        </div>
      ),
    },
    // {
    //   key: '2',
    //   label: <div onClick={() => setOpenModalBookingHistory(true)}>Lịch sử đặt phòng</div>,
    // },
    {
      key: '2',
      label: (
        <div onClick={() => handleLogout()} className="flex items-center gap-2">
          <IoIosLogOut size={20} />
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <>
      <Header className="header z-20">
        <Link className="logo !text-[#4bff70]" to={'/'}>
          HotelBooking
        </Link>

        <div className="w-full px-[40px] text-white flex gap-8 items-center">
          <a href="/room-type">HẠNG PHÒNG</a>
          <a href="/entertainment">GIẢI TRÍ</a>
          <a href="/cuisine">ẨM THỰC</a>
        </div>

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
            <Dropdown menu={{ items }} placement="bottomRight" arrow trigger="click">
              <Avatar size={36} className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                {getInitial(user?.name ?? 'U')}
              </Avatar>
            </Dropdown>
          ) : (
            <Link to="/login" className="">
              <Button type="primary" size="large" className="login-btn">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </Header>
      <ModalInfo modalOpen={openModalInfo} setModalOpen={setOpenModalInfo} />
      <ModalHistoryBooking
        modalOpen={openModalBookingHistory}
        setModalOpen={setOpenModalBookingHistory}
      />
    </>
  );
};

export default HeaderHome;
