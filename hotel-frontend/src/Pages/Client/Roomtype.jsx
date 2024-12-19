import { toast } from 'react-toastify';
import { getRoomtypeService } from '../../service/roomtypeService';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import ModalRoomDetail from '../../components/Modal/ModalRoomDetail';

const Roomtype = () => {
  const [data, setData] = useState();
  const [choiceRoom, setChoiceRoom] = useState();
  const [openModalRoomDetail, setOpenModalRoomDetail] = useState(false);

  const getRoomtype = async () => {
    const res = await getRoomtypeService('ALL');

    if (res?.errCode === 0) {
      setData(res?.data);
    } else {
      toast.error(res?.message);
    }
  };

  const handleViewDetail = (item) => {
    setChoiceRoom(item);
    setOpenModalRoomDetail(true);
  };

  useEffect(() => {
    getRoomtype();
  }, []);

  return (
    <div className="mt-32">
      <div className="flex flex-col items-center px-[25%] justify-around mb-20 ">
        <div className="text-[#333333] leading-6 text-center text-[14px]">
          Lựa chọn không gian riêng tư và tận hưởng cảm giác ấm cúng như tại ngôi nhà của chính mình
        </div>
        <div className="text-[60px] text-[#778788] big-title relative mt-6">Hạng Phòng</div>
        <div className="text-[#333333] leading-6 text-center text-[14px] mt-10">
          Khám phá sự kết hợp hoàn hảo giữa tiện nghi hiện đại và sự thoải mái tại WAFAIFO RESORT
          HOI AN, nơi mang đến cho bạn những trải nghiệm nghỉ dưỡng sang trọng trong không gian
          phòng rộng rãi và trang bị đầy đủ tiện nghi. Mỗi phòng đều hướng về khu vực Swim City sôi
          động hoặc khu vườn xanh mát của khu nghỉ dưỡng. Hãy chọn một không gian riêng tư tại
          WAFAIFO, nơi mọi mong đợi của bạn sẽ được đáp ứng!
        </div>
      </div>

      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div
              className={index % 2 === 0 ? 'flex px-20' : 'flex flex-row-reverse px-20'}
              key={item.id}
            >
              <div className="w-1/2 ">
                <div
                  className="roomtype-item"
                  style={{ backgroundImage: `url('${item?.image}'` }}
                ></div>
              </div>
              <div
                className="w-1/2 flex flex-col items-center  justify-around bg-[#F7F7F7] text-center py-3"
                id="room-type"
              >
                <div
                  className="text-[60px] text-[#778788] cursor-pointer hover:opacity-80"
                  onClick={() => handleViewDetail(item)}
                >
                  {item?.name}
                </div>
                <div className="text-[32px] text-[#778788] big-title relative px-[10%]">
                  {formatCurrency(item?.price)}
                </div>
                <div className="text-[#333333] leading-6 text-center text-[14px] line-clamp-[10] text-ellipsis mt-2 px-[10%]">
                  {item?.description}
                </div>
              </div>
            </div>
          );
        })}
      <ModalRoomDetail
        modalOpen={openModalRoomDetail}
        setModalOpen={setOpenModalRoomDetail}
        room={choiceRoom}
      />
    </div>
  );
};

export default Roomtype;
