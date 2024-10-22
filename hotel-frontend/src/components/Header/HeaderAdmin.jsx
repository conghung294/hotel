import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Dropdown } from 'antd';

import './HeaderAdmin.scss';
import ModalWaitConfirm from '../Modal/ModalWaitConfirm';
import { io } from 'socket.io-client';
import { useUser } from '../../context/UserContext';
import ModalInfo from '../Modal/ModalInfo';

const socket = io('http://localhost:8080');

const HeaderAdmin = () => {
  const [activeTab, setActiveTab] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [count, setCount] = useState();
  const [openModalInfo, setOpenModalInfo] = useState();

  const nagivate = useNavigate();
  const { user, setUser } = useUser();

  // Hàm lấy chữ cái đầu từ từ cuối cùng của tên người dùng
  const getInitial = (name) => {
    if (!name) return '';
    const words = name.trim().split(' '); // Tách tên thành mảng từ, loại bỏ khoảng trắng thừa
    return words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu của từ cuối cùng
  };

  const handleLogout = () => {
    setUser(null);
    nagivate('/login');
  };

  const handleOpenModalInfo = () => {
    setOpenModalInfo(true);
  };

  const items = [
    {
      key: '1',
      label: <div onClick={() => handleOpenModalInfo()}>Thông tin cá nhân</div>,
    },
    {
      key: '2',
      label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const openModalWaitConfirm = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    socket.on('bookingSuccess', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('bookingSuccess');
    };
  }, []);

  useEffect(() => {
    if (user?.roleId !== 'ADMIN') {
      nagivate('/');
    }
  }, [user?.roleId, nagivate]);

  return (
    <>
      <div className="admin-header">
        <ul className="px-20 flex items-center justify-between">
          <div>
            <li
              onClick={() => handleTabClick('manageTyperoom')}
              className={activeTab === 'manageTyperoom' ? 'active' : ''}
            >
              <Link to="/admin/manageTyperoom">Quản lý hạng phòng</Link>
            </li>

            <li
              onClick={() => handleTabClick('manageRoom')}
              className={activeTab === 'manageRoom' ? 'active' : ''}
            >
              <Link to="/admin/manageRoom">Quản lý phòng</Link>
            </li>

            <li
              onClick={() => handleTabClick('manageService')}
              className={activeTab === 'manageService' ? 'active' : ''}
            >
              <Link to="/admin/manageService">Quản lý dịch vụ</Link>
            </li>
          </div>

          <div className="flex items-center gap-10 ">
            <Badge
              count={count}
              offset={[10, 0]}
              className="text-white text-[16px] flex gap-2 items-center cursor-pointer hover:underline "
              onClick={() => openModalWaitConfirm()}
            >
              {/* <CiCircleCheck size={20} /> */}
              Chờ xác nhận
            </Badge>
            <Dropdown menu={{ items }} placement="bottomRight" arrow trigger="click">
              <Avatar size={36} className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                {getInitial(user?.name ?? 'U')}
              </Avatar>
            </Dropdown>
          </div>
        </ul>
      </div>
      <div className="h-[30px]"></div>
      <ModalWaitConfirm modalOpen={isOpenModal} setModalOpen={setIsOpenModal} setCount={setCount} />
      <ModalInfo modalOpen={openModalInfo} setModalOpen={setOpenModalInfo} />
    </>
  );
};

export default HeaderAdmin;
