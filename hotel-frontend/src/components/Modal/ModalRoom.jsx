import { Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { createNewRoomService, editRoomService } from '../../service/roomService';
import { getRoomtypeService } from '../../service/roomtypeService';

const ModalRoom = ({ modalOpen, setModalOpen, getRoom, action, currentRoom }) => {
  const [roomtypes, setRoomtypes] = useState();
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = async (values) => {
    if (action === 'CREATE') {
      let res = await createNewRoomService(values);
      if (res.errCode === 0) {
        form.resetFields();
        setModalOpen(false);
        toast.success('Thêm thành công!');
        getRoom();
      } else {
        toast.error(res.message);
      }
    } else {
      let res = await editRoomService({ ...values, id: currentRoom.id });
      if (res.errCode === 0) {
        form.resetFields();
        setModalOpen(false);
        toast.success('Cập nhật thành công!');
        getRoom();
      } else {
        toast.error(res.message);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const getRoomtype = async () => {
    const res = await getRoomtypeService('ALL');
    if (res.errCode === 0) {
      setRoomtypes(res.data);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (currentRoom) {
      form.setFieldsValue(currentRoom);
    } else {
      form.resetFields();
    }
  }, [currentRoom, form]);

  useEffect(() => {
    getRoomtype();
  }, []);

  return (
    <Modal
      title={action === 'CREATE' ? 'Thêm phòng' : 'Cập nhật phòng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={() => handleCancel()}
      maskClosable={false}
    >
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        labelAlign="left"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên phòng!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="typeId" label="Chọn loại phòng" rules={[{ required: true }]}>
          <Select placeholder="Loại phòng">
            {roomtypes?.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRoom;
