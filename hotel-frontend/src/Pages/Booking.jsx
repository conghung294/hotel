import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { BsArrowRepeat } from 'react-icons/bs';
import { io } from 'socket.io-client';

import DateRangePicker from '../components/DateRangePicker';
import Room from '../components/Room/Room';
import { formatCurrency } from '../utils/CommonUtils';
import { getServiceService } from '../service/serviceService';
import Service from '../components/Service/Service';
import { createNewBookingService } from '../service/bookingService';
import { useUser } from '../context/UserContext';

// Kết nối tới server socket.io
const socket = io('http://localhost:8080');

const Booking = () => {
  const { user } = useUser();
  const [roomtype, setRoomtype] = useState([]);
  const [choiceRoom, setChoiceRoom] = useState();
  const [dates, setDates] = useState(null);
  const [services, setServices] = useState();
  const [choiceServices, setChoiceServices] = useState([]);
  const [time, setTime] = useState();
  const [isChoice, setIsChoice] = useState(false);

  const handleReChoice = () => {
    setChoiceRoom(null);
    setChoiceServices([]);
  };

  const getService = async () => {
    const res = await getServiceService('ALL');
    setServices(res?.data);
  };

  const totalServicePrice = choiceServices.reduce(
    (total, service) => total + Number(service?.price),
    0
  );

  const handleSubmit = async () => {
    console.log(dates);

    if (!user) {
      toast.error('Vui lòng đăng nhập để thực hiện chức năng đặt phòng!');
      return;
    }

    const dataBooking = {
      userId: user?.id,
      typeroomId: choiceRoom?.id,
      timeCome: dates[0],
      timeGo: dates[1],
      price: choiceRoom?.price * time + totalServicePrice,
      status: '0',
      services: choiceServices,
    };
    const res = await createNewBookingService(dataBooking);
    if (res?.errCode === 0) {
      socket.emit('booking', dataBooking);
      setChoiceRoom(null);
      setChoiceServices([]);
      setRoomtype(null);
      setDates(null);
      setIsChoice(false);
      toast.success('Đặt phòng thành công. Chúng tôi sẽ sớm gửi xác nhận đến email của bạn!');
    } else {
      toast.error(res?.errMessage);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <>
      {!isChoice && (
        <div className="flex justify-center items-center home-background">
          <div className="w-[600px]">
            <div className="mb-5 text-white  flex justify-center font-bold text-lg">
              Vui lòng chọn thời gian bạn muốn ở!
            </div>
            <DateRangePicker
              setRoomtype={setRoomtype}
              setTime={setTime}
              dates={dates}
              setDates={setDates}
              setIsChoice={setIsChoice}
            />
          </div>
        </div>
      )}

      <div className="mt-20 px-10 flex justify-between">
        <div className="w-[30%]">
          {!choiceRoom && isChoice && (
            <div className="flex flex-col justify-center items-center w-full">
              <div className="mb-5 flex justify-center font-bold text-lg text-black">
                Vui lòng chọn thời gian bạn muốn ở!
              </div>
              <div className="w-full">
                <DateRangePicker
                  setRoomtype={setRoomtype}
                  setTime={setTime}
                  dates={dates}
                  setDates={setDates}
                  setIsChoice={setIsChoice}
                />
              </div>
            </div>
          )}
          {choiceRoom && (
            <div className="mt-3">
              <div className="font-bold text-lg">Thông tin thanh toán</div>
              <hr className="my-3" />
              <div className="mt-3 font-bold">Thông tin phòng</div>
              <div className="flex justify-between mt-3">
                <span>Tên phòng:</span> {choiceRoom?.name}
              </div>
              <div className="flex justify-between mt-3">
                <span>Giá phòng:</span> {formatCurrency(choiceRoom?.price)}
              </div>
              <div className="flex justify-between mt-3">
                <span>Thời gian ở:</span> {time} ngày
              </div>

              {choiceServices?.length > 0 && (
                <div>
                  <hr className="my-3" />
                  <div className="mt-3 font-bold">Dịch vụ thêm</div>
                  {choiceServices.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="flex justify-between mt-3">
                          <div>{item.name}</div>
                          <div>{formatCurrency(item?.price)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <hr className="mt-3" />
              <div className="flex justify-between mt-4">
                <span>Tổng tiền phòng:</span>
                <span className="text-blue-600 font-bold">
                  {formatCurrency(choiceRoom?.price * time + totalServicePrice)}
                </span>
              </div>
              <Button
                type="primary"
                className="w-full font-bold py-5 mt-4"
                onClick={() => handleSubmit()}
              >
                Hoàn tất đặt phòng
              </Button>
              <Button
                className="w-full font-bold py-5 mt-4 text-blue-500"
                onClick={() => handleReChoice()}
              >
                <BsArrowRepeat size={20} />
                Chọn lại
              </Button>
            </div>
          )}
        </div>

        {!choiceRoom && (
          <div className="w-[66%]">
            {roomtype?.length > 0 &&
              roomtype.map((item) => {
                return (
                  <div className="my-4 w-full" key={item?.id}>
                    <Room
                      room={item}
                      image={item?.image}
                      price={item?.price}
                      name={item?.name}
                      description={item?.description}
                      quantity={item?.count}
                      setChoiceRoom={setChoiceRoom}
                    />
                  </div>
                );
              })}
          </div>
        )}

        {choiceRoom && (
          <div className="w-[66%] mt-3">
            <div className="font-bold text-lg">Chọn thêm dịch vụ cho kỳ nghỉ của bạn</div>
            {services?.length > 0 &&
              services.map((item) => {
                return (
                  <div className="my-4 w-full" key={item.id}>
                    <Service
                      service={item}
                      image={item.image}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      setChoiceService={setChoiceServices}
                      choiceServices={choiceServices}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
