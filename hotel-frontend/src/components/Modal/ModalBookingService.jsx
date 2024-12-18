import { Modal, Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getServiceServiceByBooking, saveSelectedServices } from '../../service/serviceService';
import { formatCurrency } from '../../utils/CommonUtils';

const ModalBookingService = ({ modalOpen, setModalOpen, bookingId, getDataCheckIn }) => {
  const [data, setData] = useState([]);

  const updateQuantity = (recordKey, change) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.key === recordKey) {
          const newQuantity = Math.max(0, (item.quantity || 0) + change); // Không cho số lượng < 0
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.price, // Cập nhật thành tiền
          };
        }
        return item;
      })
    );
  };

  const handleSave = async () => {
    const res = await saveSelectedServices(data);
    if (res.errCode === 0) {
      toast.success('Lưu thông tin thành công!');
      setModalOpen(false);
      getDataCheckIn();
    } else {
      toast.error(res?.errMessage || 'Đã xảy ra lỗi!');
    }
  };

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
      align: 'center',
      width: '15%',
    },
    {
      title: 'Ảnh',
      key: 'image',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <div className="flex justify-center items-center">
          <div className="w-[90px] h-[60px] rounded-lg overflow-hidden ">
            <img src={record?.image} alt="Ảnh dịch vụ" className="w-full h-full object-cover" />
          </div>
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: '30%',
      render: (_, record) => (
        <div className="text-ellipsis line-clamp-3">{record?.description}</div>
      ),
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
      title: 'Số lượng',
      key: 'quantity',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="small"
            onClick={() => updateQuantity(record.key, -1)}
            disabled={record.quantity === 0}
          >
            -
          </Button>
          <span>{record.quantity || 0}</span>
          <Button size="small" onClick={() => updateQuantity(record.key, 1)}>
            +
          </Button>
        </div>
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      width: '15%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.total || 0)}</div>,
    },
  ];

  useEffect(() => {
    const getService = async () => {
      const res = await getServiceServiceByBooking(bookingId);
      if (res.errCode === 0) {
        const dataWithKeys = res?.data?.map((item) => ({
          ...item,
          key: item?.id,
          bookingId: bookingId,
          quantity: item?.quantity || 0, // Lấy số lượng từ API hoặc mặc định là 0
          total: (item?.quantity || 0) * item?.price, // Tính tổng tiền mặc định
        }));
        setData(dataWithKeys);
      } else {
        toast.error(res?.errMessage);
      }
    };

    if (modalOpen) {
      getService();
    }
  }, [modalOpen, bookingId]);

  return (
    <Modal
      title={'Thêm dịch vụ'}
      centered
      open={modalOpen}
      onOk={handleSave}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
      className="!w-[80%]"
      okText="Lưu thông tin"
      cancelText="Hủy bỏ"
    >
      <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 3 }} />
    </Modal>
  );
};

export default ModalBookingService;
