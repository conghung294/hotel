import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { BsArrowRepeat } from 'react-icons/bs';

import DateRangePicker from '../../components/DateRangePicker';
import Room from '../../components/Room/Room';
import { formatCurrency } from '../../utils/CommonUtils';
import { getServiceService } from '../../service/serviceService';
import Service from '../../components/Service/Service';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { getSettingService } from '../../service/settingService';

const Booking = () => {
  const { user } = useUser();
  const [roomtype, setRoomtype] = useState([]);
  const [choiceRoom, setChoiceRoom] = useState();
  const [dates, setDates] = useState(null);
  const [services, setServices] = useState();
  const [choiceServices, setChoiceServices] = useState([]);
  const [time, setTime] = useState();
  const [isChoice, setIsChoice] = useState(false);
  const [prePay, setPrePay] = useState(50);

  const handleReChoice = () => {
    setChoiceRoom(null);
    setChoiceServices([]);
  };

  const getSetting = async () => {
    const res = await getSettingService();
    if (res.errCode === 0) {
      setPrePay(res?.data?.prePayment);
    } else {
      toast.error('Có lỗi xảy ra!');
    }
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
      status: '-1',
      services: choiceServices,
      paid: ((choiceRoom?.price * time + totalServicePrice) * prePay) / 100,
    };

    const response = await axios.post('http://localhost:8080/vnpay/payment', {
      amount: ((choiceRoom?.price * time + totalServicePrice) * prePay) / 100, // Số tiền thanh toán
      bankCode: '',
      language: 'vn',
      dataBooking,
    });

    if (response?.data) {
      window.location.href = response.data; // Chuyển hướng người dùng đến VNPay
    }
  };

  useEffect(() => {
    getService();
    getSetting();
  }, []);

  return (
    <div className="min-h-[100vh] ">
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

      <div className="mt-20 px-10 flex justify-end ">
        <div className="w-[30%]  fixed top-[90px] left-[30px]">
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
            <div className="mt-3 bg-white px-3 pb-3 rounded-lg">
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
                  <div className="h-[200px] overflow-y-auto">
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
                </div>
              )}
              <hr className="mt-3" />
              <div className="flex justify-between mt-4">
                <span>Tổng tiền phòng:</span>
                <span className="text-blue-600 font-bold">
                  {formatCurrency(choiceRoom?.price * time + totalServicePrice)}
                </span>
              </div>
              <div className="mt-3 text-red-600">
                Vui lòng thanh toán trước <span>{prePay}</span>% đơn đặt phòng!
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

        {!choiceRoom && isChoice && (
          <div className="w-[66%]">
            {roomtype?.length > 0 ? (
              roomtype.map((item) => (
                <div className="my-4 w-full" key={item?.id}>
                  <Room room={item} setChoiceRoom={setChoiceRoom} />
                </div>
              ))
            ) : (
              <div className="text-center text-red-500 text-lg mt-3">
                Không có phòng nào thỏa mãn thời gian đã chọn. Vui lòng chọn ngày khác.
                <div className="no-room mt-6"></div>
              </div>
            )}
          </div>
        )}

        {choiceRoom && (
          <div className="w-[66%] mt-3 pb-40">
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
    </div>
  );
};

export default Booking;
