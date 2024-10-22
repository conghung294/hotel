import { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { VscQuestion } from 'react-icons/vsc';

import { deleteRoomService, getRoomService } from '../../service/roomService';
import ModalRoom from '../../components/Modal/ModalRoom';
import { formatCurrency } from '../../utils/CommonUtils';

const ManageRoom = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [currentRoom, setCurrentRoom] = useState('');

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Loại phòng',
      dataIndex: ['roomtypeData', 'name'],
      key: 'name',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Giá',
      dataIndex: ['roomtypeData', 'price'],
      key: 'price',
      width: '20%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.roomtypeData.price)}</div>,
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditRoom(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa phòng"
            description={`Bạn có chắc chắn muốn xóa ${record.name}?`}
            placement="topRight"
            icon={
              <div className="mt-[2px] pr-1">
                <VscQuestion size={20} style={{ color: 'red' }} />
              </div>
            }
            onConfirm={() => deleteRoom(record.id)}
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

  const deleteRoom = async (id) => {
    const res = await deleteRoomService(id);
    if (res.errCode === 0) {
      toast.success('Xóa thành công!');
      getRoom();
    } else {
      toast.error(res.message);
    }
  };

  const getRoom = async () => {
    const res = await getRoomService('ALL');
    const dataWithKeys = res.data?.map((item, index) => ({
      ...item,
      key: item.id,
      stt: index + 1,
    }));
    if (res.errCode === 0) {
      setData(dataWithKeys);
    } else {
      toast.error(res.message);
    }
  };

  const handleAddRoom = () => {
    setCurrentRoom();
    setAction('CREATE');
    setModalOpen(true);
  };

  const handleEditRoom = (room) => {
    setCurrentRoom(room);
    setAction('EDIT');
    setModalOpen(true);
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <>
      <div className="pt-10 px-20">
        <Button type="primary" onClick={() => handleAddRoom()}>
          <FiPlus /> Thêm mới
        </Button>
        <div className="mt-5">
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>

      <ModalRoom
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getRoom={getRoom}
        action={action}
        currentRoom={currentRoom}
      />
    </>
  );
};

export default ManageRoom;