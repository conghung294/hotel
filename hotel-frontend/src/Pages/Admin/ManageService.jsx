import { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { VscQuestion } from 'react-icons/vsc';

import {
  deleteServiceService,
  getServiceService,
  searchServiceService,
} from '../../service/serviceService';
import ModalService from '../../components/Modal/ModalService';
import { formatCurrency } from '../../utils/CommonUtils';

const ManageService = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [currentService, setCurrentService] = useState('');

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
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Ảnh',
      key: 'image',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <div className="w-[240px] h-[160px] rounded-lg overflow-hidden flex justify-center">
          <img src={record?.image} alt="Ảnh dịch vụ" className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'status',
      width: '35%',
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
          <Button type="primary" onClick={() => handleEditService(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa dịch vụ"
            description={`Bạn có chắc chắn muốn xóa dịch vụ ${record?.name}?`}
            placement="topRight"
            icon={
              <div className="mt-[2px] pr-1">
                <VscQuestion size={20} style={{ color: 'red' }} />
              </div>
            }
            onConfirm={() => deleteService(record?.id)}
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

  const onSearch = async (value) => {
    const res = await searchServiceService(value);
    const dataWithKeys = res?.data?.map((item) => ({
      ...item,
      key: item?.id,
    }));
    setData(dataWithKeys);
  };

  const deleteService = async (id) => {
    const res = await deleteServiceService(id);
    if (res?.errCode === 0) {
      toast.success('Xóa thành công!');
      getService();
    } else {
      toast.error(res?.message);
    }
  };

  const getService = async () => {
    const res = await getServiceService('ALL');
    const dataWithKeys = res?.data?.map((item) => ({
      ...item,
      key: item?.id,
    }));
    if (res.errCode === 0) {
      setData(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  };

  const handleAddService = () => {
    setCurrentService();
    setAction('CREATE');
    setModalOpen(true);
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    setAction('EDIT');
    setModalOpen(true);
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <>
      <div className="pt-10 px-20">
        <Space>
          <Button type="primary" onClick={() => handleAddService()}>
            <FiPlus /> Thêm mới
          </Button>
          <Search
            placeholder="Nhập dịch vụ cần tìm kiếm!"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </Space>

        <div className="mt-5">
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>

      <ModalService
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getService={getService}
        action={action}
        currentService={currentService}
      />
    </>
  );
};

export default ManageService;
