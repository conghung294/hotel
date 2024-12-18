import { Form, Input, InputNumber, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { createNewRoomtypeService, editRoomtypeService } from '../../service/roomtypeService';
import { getBase64 } from '../../utils/CommonUtils';
import './Modal.scss';

const ModalRoomtype = ({ modalOpen, setModalOpen, getRoomtype, action, currentRoomtype }) => {
  const [previewImgURL, setPreviewImgURL] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = async (values) => {
    try {
      let res;
      if (action === 'CREATE') {
        res = await createNewRoomtypeService({ ...values, image: avatar });
      } else {
        res = await editRoomtypeService({
          ...values,
          id: currentRoomtype.id,
          image: avatar,
        });
      }

      if (res.errCode === 0) {
        form.resetFields();
        setAvatar('');
        setPreviewImgURL('');
        setModalOpen(false);
        toast.success(action === 'CREATE' ? 'Thêm thành công!' : 'Cập nhật thành công!');
        getRoomtype();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setAvatar('');
    setPreviewImgURL('');
  };

  const handleOnChangeImage = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const base64 = await getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImgURL(objectUrl);
      setAvatar(base64);
    }
  };

  const openPreviewImage = () => {
    if (previewImgURL) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (currentRoomtype) {
      form.setFieldsValue(currentRoomtype);
      // Optional: Set preview image if currentRoomtype has an image
      if (currentRoomtype.image) {
        setPreviewImgURL(currentRoomtype.image); // Assuming image is a base64 string or a URL
        setAvatar(currentRoomtype.image);
      }
    } else {
      form.resetFields();
    }
  }, [currentRoomtype, form]);

  return (
    <Modal
      title={action === 'CREATE' ? 'Thêm hạng phòng' : 'Cập nhật hạng phòng'}
      centered
      open={modalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        labelAlign="left"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá (VNĐ)"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="people"
          label="Số người ở"
          rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="area"
          label="Diện tích (m²)"
          rules={[{ required: true, message: 'Vui lòng diện tích!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <div className="preview-img-container">
          <input type="file" id="previewImg" hidden onChange={handleOnChangeImage} />
          <label htmlFor="previewImg" className="label-upload">
            Tải ảnh
            <i className="fas fa-upload"></i>
          </label>
          <div
            className="preview-image"
            style={{ backgroundImage: `url(${previewImgURL})` }}
            onClick={openPreviewImage}
          ></div>
        </div>

        <Lightbox slides={[{ src: previewImgURL }]} close={() => setIsOpen(false)} open={isOpen} />
      </Form>
    </Modal>
  );
};

export default ModalRoomtype;
