import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';

import './HeaderAdmin.scss';
import ModalWaitConfirm from '../Modal/ModalWaitConfirm';
import { useUser } from '../../context/UserContext';
import ModalInfo from '../Modal/ModalInfo';
import ModalSetting from '../Modal/ModalSetting';
import { FaHome } from 'react-icons/fa';

const HeaderAdmin = () => {
  const [activeTab, setActiveTab] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [count, setCount] = useState();
  const [openModalInfo, setOpenModalInfo] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [isShowModalSettings, setIsShowModalSettings] = useState(false);

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
    if (user?.roleId !== 'Quản lý' && user?.roleId !== 'Lễ tân') {
      nagivate('/');
    }
  }, [user?.roleId, nagivate]);

  return (
    <>
      <div className="admin-header">
        <ul className="px-20 flex items-center justify-between">
          <div>
            <li
              onClick={() => handleTabClick('admin')}
              className={`${activeTab === 'admin' ? 'active' : ''} `}
            >
              <Link to="/admin">
                <FaHome size={20} />
              </Link>
            </li>

            <li
              onClick={() => handleTabClick('manageUser')}
              className={`${activeTab === 'manageUser' ? 'active' : ''} `}
            >
              <Link to="/admin/manageUser">Quản lý người dùng</Link>
            </li>
            <li
              onClick={() => handleTabClick('manageTyperoom')}
              className={`${activeTab === 'manageTyperoom' ? 'active' : ''} `}
            >
              <Link to="/admin/manageTyperoom">Quản lý hạng phòng</Link>
            </li>

            <li
              onClick={() => handleTabClick('manageRoom')}
              className={`${activeTab === 'manageRoom' ? 'active' : ''} `}
            >
              <Link to="/admin/manageRoom">Quản lý phòng</Link>
            </li>

            <li
              onClick={() => handleTabClick('manageService')}
              className={`${activeTab === 'manageService' ? 'active' : ''} `}
            >
              <Link to="/admin/manageService">Quản lý dịch vụ</Link>
            </li>

            <li
              onClick={() => handleTabClick('booking')}
              className={`${activeTab === 'booking' ? 'active' : ''} `}
            >
              <Link to="/admin/booking">Lịch đặt phòng</Link>
            </li>
          </div>

          <div className="flex items-center gap-4 ">
            <Badge
              count={count}
              offset={[10, 0]}
              className="text-white text-[16px] flex gap-2 items-center cursor-pointer hover:underline mr-6"
              onClick={() => openModalWaitConfirm()}
            >
              {/* <CiCircleCheck size={20} /> */}
              Chờ xác nhận
            </Badge>

            <div
              className=" border-white-light bg-[#E3E8EF] dark:border-white-light/10 flex rounded-full p-2 cursor-pointer  hover:text-[#4361ee]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsShowModalSettings(true)}
            >
              <Tooltip title={'Thiết lập'}>
                <svg
                  className={`text-[#1c1c1c] font-extrabold ${
                    isHovered ? 'animate-[spin_3s_linear_infinite]' : ''
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"></circle>
                  <path
                    opacity="1"
                    d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                </svg>
              </Tooltip>
            </div>

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
      <ModalSetting modalOpen={isShowModalSettings} setModalOpen={setIsShowModalSettings} />
    </>
  );
};

export default HeaderAdmin;
