import { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { VscQuestion } from 'react-icons/vsc';

import {
  deleteRoomtypeService,
  getRoomtypeService,
  searchRoomtypeService,
} from '../../service/roomtypeService';
import ModalRoomtype from '../../components/Modal/ModalRoomtype';
import { formatCurrency } from '../../utils/CommonUtils';

const ManageTyperoom = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [currentRoomtype, setCurrentRoomtype] = useState();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Hạng phòng',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Ảnh',
      key: 'image',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <div className="w-[240px] h-[160px] rounded-lg overflow-hidden flex justify-center">
          <img src={record?.image} alt="Ảnh hạng phòng" className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record?.price)}</div>,
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditRoomtype(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa hạng phòng"
            description={`Khi xóa hạng phòng này các phòng liên quan cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa hạng phòng ${record.name}?`}
            placement="topRight"
            icon={
              <div className="mt-[2px] pr-1">
                <VscQuestion size={20} style={{ color: 'red' }} />
              </div>
            }
            onConfirm={() => deleteRoomtype(record?.id)}
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

  const deleteRoomtype = async (id) => {
    const res = await deleteRoomtypeService(id);
    if (res?.errCode === 0) {
      toast.success('Xóa thành công!');
      getRoomtype();
    } else {
      toast.error(res?.message);
    }
  };

  const getRoomtype = async () => {
    const res = await getRoomtypeService('ALL');
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

  const handleAddRoomtype = () => {
    setCurrentRoomtype();
    setAction('CREATE');
    setModalOpen(true);
  };

  const handleEditRoomtype = (roomtype) => {
    setCurrentRoomtype(roomtype);
    setAction('EDIT');
    setModalOpen(true);
  };

  const onSearch = async (value) => {
    const res = await searchRoomtypeService(value);
    const dataWithKeys = res.data.map((item) => ({
      ...item,
      key: item?.id,
    }));
    setData(dataWithKeys);
  };

  useEffect(() => {
    getRoomtype();
  }, []);

  return (
    <>
      <div className="pt-10 px-20">
        <Space>
          <Button type="primary" onClick={() => handleAddRoomtype()}>
            <FiPlus /> Thêm mới
          </Button>
          <Search
            placeholder="Nhập hạng phòng cần tìm kiếm!"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </Space>

        <div className="mt-5">
          <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 5 }} />
        </div>
      </div>

      <ModalRoomtype
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getRoomtype={getRoomtype}
        action={action}
        currentRoomtype={currentRoomtype}
      />
    </>
  );
};

export default ManageTyperoom;
