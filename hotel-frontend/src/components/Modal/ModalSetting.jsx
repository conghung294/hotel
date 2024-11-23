/* eslint-disable react/prop-types */
import { Modal, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { editSettingService, getSettingService } from '../../service/settingService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const ModalSetting = ({ modalOpen, setModalOpen }) => {
  const [timeCome, setTimeCome] = useState(dayjs('12:00', 'HH:mm'));
  const [timeGo, setTimeGo] = useState(dayjs('14:00', 'HH:mm'));
  const [hour, setHour] = useState(dayjs('06:00', 'HH:mm'));

  const handleTimeComeChange = (time) => {
    setTimeCome(time);
  };

  const handleTimeGoChange = (time) => {
    setTimeGo(time);
  };

  const handleHourChange = (time) => {
    setHour(time);
  };

  const getSetting = async () => {
    const res = await getSettingService();
    if (res.errCode === 0) {
      setTimeCome(dayjs(res.data?.timeCome, 'HH:mm'));
      setTimeGo(dayjs(res.data?.timeGo, 'HH:mm'));
      setHour(dayjs(res.data?.comeFirst, 'HH:mm'));
    } else {
      toast.error('Có lỗi xảy ra!');
    }
  };

  const handleUpdateSetting = async () => {
    const res = await editSettingService({
      timeCome: timeCome,
      timeGo: timeGo,
      comeFirst: hour,
    });
    if (res.errCode === 0) {
      toast.success('Cập nhật thành công!');
      setModalOpen(false);
    } else {
      toast.error('Cập nhật thất bại!');
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <Modal
      title={'Thiết lập'}
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={() => handleUpdateSetting()}
      maskClosable={false}
      className="!w-[30%]"
      okText="Lưu lại"
      cancelText="Hủy bỏ"
    >
      <div className="border-y py-6">
        <div className="flex justify-between">
          Thời gian nhận phòng
          <TimePicker
            value={timeCome}
            onChange={handleTimeComeChange}
            format="HH:mm"
            placeholder="Chọn thời gian"
            minuteStep={5}
            allowClear={false}
          />
        </div>
        <div className="flex justify-between mt-5">
          Thời gian trả phòng
          <TimePicker
            value={timeGo}
            onChange={handleTimeGoChange}
            format="HH:mm"
            placeholder="Chọn thời gian"
            minuteStep={5}
            allowClear={false}
          />
        </div>
        <div className="flex justify-between mt-5">
          Thông báo trước
          <TimePicker
            value={hour}
            onChange={handleHourChange}
            format="HH:mm"
            showNow={false}
            allowClear={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalSetting;
