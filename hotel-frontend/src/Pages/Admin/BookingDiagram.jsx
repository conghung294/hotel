import { useEffect, useState } from 'react';
import { getRoomService } from '../../service/roomService';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/CommonUtils';
import ModalCheckIn from '../../components/Modal/ModalCheckIn';
import { FaRegSquare } from 'react-icons/fa';
import ModalCheckOut from '../../components/Modal/ModalCheckOut';

const BookingDiagram = () => {
  const [data, setData] = useState([]);
  const [modalCheckInOpen, setModalCheckInOpen] = useState(false);
  const [modalCheckOutOpen, setModalCheckOutOpen] = useState(false);
  const [choiceRoom, setChoiceRoom] = useState();

  const getRoom = async () => {
    const res = await getRoomService('ALL');
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

  const handleClickRoom = (room) => {
    setChoiceRoom(room);
    if (room?.status === 'ĐANG TRỐNG') {
      setModalCheckInOpen(true);
    } else {
      setModalCheckOutOpen(true);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-2">
          <FaRegSquare color="green" /> <span className="mt-[-2px]">Đang trống</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaRegSquare color="orange" /> <span className="mt-[-2px]">Đang sử dụng</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-[20px] mt-5">
        {data?.length > 0 &&
          data.map((item) => {
            return (
              <div
                className={`w-[calc(20%-16px)] h-[120px] p-[10px] pt-[16px] border rounded-md ${
                  item?.status === 'ĐANG TRỐNG'
                    ? 'bg-[#F2F7F6] border-green-600'
                    : 'bg-[#fff2da] border-orange-600'
                }  cursor-pointer hover:opacity-90`}
                key={item.id}
                onClick={() => handleClickRoom(item)}
              >
                <span
                  className={`${
                    item?.status === 'ĐANG TRỐNG' ? 'bg-[#198352]' : 'bg-[#ffbf49]'
                  } rounded-md text-white px-2 py-2`}
                >
                  {item.name}
                </span>
                <div className="mt-3 font-bold truncate">{item?.roomtypeData.name}</div>
                <div className="mt-3">{formatCurrency(item?.roomtypeData.price)} / ngày</div>
              </div>
            );
          })}
      </div>
      <ModalCheckIn
        modalOpen={modalCheckInOpen}
        setModalOpen={setModalCheckInOpen}
        room={choiceRoom}
        getRoom={getRoom}
      />

      <ModalCheckOut
        modalOpen={modalCheckOutOpen}
        setModalOpen={setModalCheckOutOpen}
        room={choiceRoom}
        getRoom={getRoom}
      />
    </>
  );
};

export default BookingDiagram;
