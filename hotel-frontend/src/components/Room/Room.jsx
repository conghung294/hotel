import { Button } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState } from 'react';
import ModalRoomDetail from '../Modal/ModalRoomDetail';

const Room = ({ setChoiceRoom, room }) => {
  const [openModalRoomDetail, setOpenModalRoomDetail] = useState(false);

  const handleChoiceRooom = () => {
    setChoiceRoom(room);
  };

  const handleViewDetail = () => {
    setOpenModalRoomDetail(true);
  };
  return (
    <div className="border p-4 flex justify-between items-center bg-white rounded-lg shadow-lg h-[220px] w-full">
      <div className="flex-shrink-0 w-[270px] h-[180px] rounded-lg overflow-hidden">
        <img src={room?.image} alt="Room" className="w-full h-full object-cover" />
      </div>

      <div className=" px-4 h-full flex flex-col w-full">
        <div className="w-full">
          <h2 className="text-lg font-semibold mt-1">{room?.name}</h2>
          <div className="text-gray-500 flex items-center space-x-2 mt-2">
            <MdOutlinePeopleAlt size={20} />
            <div className="mt-1">Tối đa {room?.people} người</div>
          </div>
          <div className="text-gray-600 mt-2 leading-6 text-ellipsis line-clamp-3 ">
            {room?.description}
          </div>
        </div>
        <div
          className="text-blue-600 mt-4 flex gap-2 items-center cursor-pointer hover:opacity-80"
          onClick={() => handleViewDetail()}
        >
          Chi tiết <FaArrowRightLong />
        </div>
      </div>

      <div className="flex flex-col justify-between border-l-2 pl-4  h-full !w-[180px] flex-shrink-0">
        <div className="text-xl font-semibold text-black flex justify-center gap-2 mt-1">
          {formatCurrency(room?.price)}
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-red-500 ">Còn {room?.count} phòng trống</span>
          <Button type="primary" className="w-full mt-4" onClick={() => handleChoiceRooom()}>
            Chọn
          </Button>
        </div>
      </div>
      <ModalRoomDetail
        modalOpen={openModalRoomDetail}
        setModalOpen={setOpenModalRoomDetail}
        room={room}
      />
    </div>
  );
};

export default Room;
