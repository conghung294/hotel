import { Form, Input, Select, Table, Tabs } from 'antd';
import { useUser } from '../../context/UserContext';
import { editUserService, getAllUsers } from '../../service/userService';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import { getBookingService } from '../../service/bookingService';
import dayjs from 'dayjs';
import { CiUser } from 'react-icons/ci';
import { MdHistory } from 'react-icons/md';

function PersonalInfo() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState();
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('1'); // Lưu trạng thái tab hiện tại

  const columns = [
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '9%',
      align: 'center',
      render: (createdAt) => {
        return dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đến',
      dataIndex: 'timeCome',
      key: 'timeCome',
      width: '9%',
      align: 'center',
      render: (timeCome) => {
        return dayjs(timeCome).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Thời gian đi',
      dataIndex: 'timeGo',
      key: 'timeGo',
      width: '9%',
      align: 'center',
      render: (timeGo) => {
        return dayjs(timeGo).format('HH:mm:ss DD/MM/YYYY');
      },
    },
    {
      title: 'Loại phòng',
      dataIndex: ['typeData', 'name'],
      key: 'typeroom',
      width: '12%',
      align: 'center',
    },
    {
      title: 'Tên phòng',
      dataIndex: ['roomData', 'name'],
      key: 'typeroom',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
      width: '15%',
      render: (_, record) => (
        <div>
          {record?.services?.map((item) => {
            return <div key={item?.id}>-{item?.name}</div>;
          })}
        </div>
      ),
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'price',
      key: 'price',
      width: '8%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record.price)}</div>,
    },
    {
      title: 'Đã trả',
      dataIndex: 'paid',
      key: 'paid',
      width: '8%',
      align: 'center',
      render: (_, record) => <div>{formatCurrency(record?.paid)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <div>
          {record?.status === '0'
            ? 'CHỜ XÁC NHẬN'
            : record?.status === '1'
            ? 'ĐÃ XÁC NHẬN'
            : record?.status === '2'
            ? 'ĐANG SỬ DỤNG'
            : record?.status === '3'
            ? 'HOÀN THÀNH'
            : ''}
        </div>
      ),
    },
  ];

  const getBookings = useCallback(async () => {
    const res = await getBookingService(user?.id);
    const dataWithKeys = res?.data?.map((item, index) => ({ ...item, key: index }));
    setData(dataWithKeys);
  }, [user?.id]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  useEffect(() => {
    const getUser = async () => {
      const res = await getAllUsers(user?.id);
      if (res?.errCode === 0) {
        setUserInfo(res?.data);
      }
    };
    getUser();
  }, [user?.id]);

  const onFinish = async (values) => {
    const res = await editUserService({ ...values, id: user.id });
    if (res.errCode === 0) {
      toast.success('Lưu thông tin thành công');
    } else {
      toast.error('Lưu thông tin thất bại');
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <div className="flex items-center  gap-2 pr-4">
          <CiUser size={20} /> Thông tin cá nhân
        </div>
      ),
      children: (
        <div className="w-full px-10">
          <Form
            form={form}
            labelCol={{ span: 3 }}
            labelAlign="left"
            onFinish={onFinish}
            initialValues={userInfo}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Vui lòng nhập đúng định dạng email!',
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item label="Họ và tên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="CCCD" name="cccd">
              <Input />
            </Form.Item>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-2">
          <MdHistory size={20} /> Lịch sử đặt phòng
        </div>
      ),
      children: (
        <div className="">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            className=""
            pagination={false} // Tắt phân trang
            scroll={{ y: '66vh' }}
          />
        </div>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo);
    }
  }, [userInfo, form]);

  return (
    <div className="flex mt-[100px] h-[80vh] px-6 w-full">
      <Tabs
        defaultActiveKey="1"
        items={items}
        activeKey={activeTab}
        onChange={handleTabChange}
        tabPosition="left"
        className="w-full"
      />
    </div>
  );
}

export default PersonalInfo;
