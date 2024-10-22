import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from 'antd';

import './HeaderAdmin.scss';
import ModalWaitConfirm from '../Modal/ModalWaitConfirm';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const HeaderAdmin = () => {
  const [activeTab, setActiveTab] = useState('manageTyperoom');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [count, setCount] = useState();

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

            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
          </div>
        </ul>
      </div>
      <div className="h-[30px]"></div>
      <ModalWaitConfirm modalOpen={isOpenModal} setModalOpen={setIsOpenModal} setCount={setCount} />
    </>
  );
};

export default HeaderAdmin;
