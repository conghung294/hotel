import { useContext, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FaHotel } from 'react-icons/fa6';
import ModalWaitConfirm from '../Modal/ModalWaitConfirm';
import ModalInfo from '../Modal/ModalInfo';
import { UserContext } from '../../context/UserContext';
import { CiCircleCheck, CiClock2, CiViewList, CiViewTable } from 'react-icons/ci';

import { PiDeviceTablet } from 'react-icons/pi';
import { handleLogoutApi } from '../../service/userService';
const { Header, Sider, Content } = Layout;
const ReceptionistLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [count, setCount] = useState();
  const [openModalInfo, setOpenModalInfo] = useState();

  const nagivate = useNavigate();
  const { user, logoutContext } = useContext(UserContext);

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

  const handleOpenModalInfo = () => {
    setOpenModalInfo(true);
  };

  const openModalWaitConfirm = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    console.log(user);
    if (user?.roleId !== 'Quản lý' && user?.id !== '') {
      nagivate('/');
    }
  }, [user?.roleId, nagivate, user]);

  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {!collapsed ? (
          <div className={` flex gap-2 py-4 pb-14 items-center justify-center`}>
            <FaHotel size={30} color="white" />
            <div className="text-white font-bold text-[28px]">PH HOTEL</div>
          </div>
        ) : (
          <div className={` flex gap-2 py-4 pb-14 items-center justify-center`}>
            <FaHotel size={30} color="white" />
          </div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '2',
              icon: <CiClock2 size={20} />,
              label: 'Quản lý chung',
              children: [
                {
                  icon: <CiViewList size={20} />,
                  label: <Link to="/admin/bookingList">Dạng danh sách</Link>,
                },
                {
                  icon: <PiDeviceTablet size={20} />,
                  label: <Link to="/admin/bookingDiagram">Dạng sơ đồ</Link>,
                },
                {
                  icon: <CiViewTable size={20} />,
                  label: <Link to="/admin/bookingCalendar">Dạng lưới</Link>,
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '20px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <div className="flex items-center gap-4 ">
            <Badge
              count={count}
              offset={[0, 0]}
              className="text-[16px] flex gap-2 items-center cursor-pointer mr-3 bg-[#1677FF] p-2 rounded-2xl text-white"
              onClick={() => openModalWaitConfirm()}
            >
              <CiCircleCheck size={20} />
              Chờ xác nhận
            </Badge>

            {/* <div className="w-[1px] h-[60%] bg-red-600"></div>
            <div>{user?.name || user?.email || user?.phoneNumber}</div> */}
            <Dropdown menu={{ items }} placement="bottomRight" arrow trigger="click">
              <Avatar size={36} className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                {getInitial(user?.name ?? 'U')}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
          }}
          className="custom-scrollbar"
        >
          {children}
        </Content>
      </Layout>

      <ModalWaitConfirm modalOpen={isOpenModal} setModalOpen={setIsOpenModal} setCount={setCount} />
      <ModalInfo modalOpen={openModalInfo} setModalOpen={setOpenModalInfo} />
    </Layout>
  );
};
export default ReceptionistLayout;
