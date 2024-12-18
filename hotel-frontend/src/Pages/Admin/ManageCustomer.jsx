import { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { VscQuestion } from 'react-icons/vsc';

import { deleteUserService, getAllCustomers, searchUserService } from '../../service/userService';
import ModalUser from '../../components/Modal/ModalUser';

const ManageCustomer = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [currentUser, setCurrentUser] = useState();

  const columns = [
    {
      title: 'Mã KH',
      dataIndex: 'stt',
      key: 'stt',
      width: '7%',
      align: 'center',
      render: (_, record) => <div>{record?.id}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      align: 'center',
    },

    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
      align: 'center',
    },
    {
      title: 'CCCD',
      dataIndex: 'cccd',
      key: 'cccd',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '8%',
      align: 'center',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
      align: 'center',
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa khách hàng"
            description={`Bạn có chắc chắn muốn xóa khách hàng ${record.name} không?`}
            placement="topRight"
            icon={
              <div className="mt-[2px] pr-1">
                <VscQuestion size={20} style={{ color: 'red' }} />
              </div>
            }
            onConfirm={() => deleteUser(record?.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteUser = async (id) => {
    const res = await deleteUserService(id);
    if (res?.errCode === 0) {
      toast.success('Xóa thành công!');
      getUser();
    } else {
      toast.error(res?.message);
    }
  };

  const getUser = async () => {
    const res = await getAllCustomers();
    const dataWithKeys = res.data.map((item) => ({
      ...item,
      key: item?.id,
    }));
    if (res?.errCode === 0) {
      setData(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setAction('EDIT');
    setModalOpen(true);
  };

  const onSearch = async (value) => {
    const res = await searchUserService(value);
    const dataWithKeys = res.data.map((item) => ({
      ...item,
      key: item?.id,
    }));
    setData(dataWithKeys);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="">
        <Search
          placeholder="Nhập khách hàng cần tìm kiếm!"
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />

        <div className="mt-5">
          <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 5 }} />
        </div>
      </div>

      <ModalUser
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getUser={getUser}
        action={action}
        currentUser={currentUser}
        role="customer"
      />
    </>
  );
};

export default ManageCustomer;
