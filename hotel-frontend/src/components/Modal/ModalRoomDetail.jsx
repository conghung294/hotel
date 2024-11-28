import { Modal } from 'antd';
import {
  MdOutlineBedroomParent,
  MdOutlineDescription,
  MdOutlinePeopleAlt,
  MdOutlinePriceChange,
} from 'react-icons/md';
import { formatCurrency } from '../../utils/CommonUtils';

const ModalRoomDetail = ({ modalOpen, setModalOpen, room }) => {
  return (
    <Modal
      title={'Thông tin phòng'}
      centered
      open={modalOpen}
      footer={false}
      onCancel={() => setModalOpen(false)}
      className="!w-[1100px]"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-[600px] h-[400px] rounded-lg overflow-hidden">
          <img src={room?.image} alt="Room" className="w-full h-full object-cover" />
        </div>
        <div className="w-[500px]">
          <div className="font-bold text-[24px]">{room?.name}</div>
          <div className="flex items-center space-x-2 mt-3">
            <MdOutlinePeopleAlt size={20} />
            <div>
              <span className="font-bold mr-2">Số người ở tối đa:</span> {room?.people} người
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <MdOutlineBedroomParent size={20} />
            <div>
              <span className="font-bold mr-2">Diện tích phòng:</span> {room?.area} m²
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <MdOutlinePriceChange size={20} />
            <div>
              <span className="font-bold mr-2">Giá phòng: </span>
              {formatCurrency(room?.price)} / ngày
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <MdOutlineDescription size={20} />
            <div className="font-bold">Mô tả:</div>
          </div>
          <div className="leading-6 text-justify mt-2">{room?.description}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRoomDetail;
