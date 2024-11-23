/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import dayjs from 'dayjs';

export const Bill = forwardRef((props, ref) => {
  const { data } = props;

  // Tính tổng thời gian ở
  const stayDurationDays = dayjs(data?.timeGo)
    .startOf('day')
    .diff(dayjs(data?.timeCome).startOf('day'), 'day');
  const stayPrice = stayDurationDays * (data?.typeData?.price || 0);

  // Tính tổng tiền dịch vụ
  const totalServicePrice = data?.services?.reduce((total, item) => {
    const quantity = item?.BookingService?.quantity || 0;
    const servicePrice = item?.price || 0;
    return total + servicePrice * quantity;
  }, 0);

  // Tính tổng thanh toán
  const totalPrice = stayPrice + totalServicePrice;

  return (
    <div ref={ref} className="flex justify-center items-center mt-20">
      <div className="w-[80%]">
        <div className="text-center font-bold text-lg mb-5">HÓA ĐƠN THANH TOÁN</div>
        <p className="font-bold">1. Thông tin khách hàng</p>
        <div className="flex">
          <div className="flex flex-col w-[400px]">
            <p>Họ tên khách hàng:</p>
            <p>Số điện thoại:</p>
            <p>Số CCCD:</p>
            <p>Giới tính:</p>
            <p>Địa chỉ:</p>
            <p>Email:</p>
          </div>

          <div className="flex flex-col">
            <p>{data?.bookingData?.name || 'Không có'}</p>
            <p>{data?.bookingData?.phoneNumber || 'Không có'}</p>
            <p>{data?.bookingData?.cccd || 'Không có'}</p>
            <p>{data?.bookingData?.gender || 'Không có'}</p>
            <p>{data?.bookingData?.address || 'Không có'}</p>
            <p>{data?.bookingData?.email || 'Không có'}</p>
          </div>
        </div>
        <p className="font-bold">2. Thông tin đặt phòng</p>
        <div className="flex">
          <div className="flex flex-col w-[400px]">
            <p>Tên phòng:</p>
            <p>Loại phòng:</p>
            <p>Thời gian đến:</p>
            <p>Thời gian đi:</p>
          </div>
          <div className="flex flex-col">
            <p>{data?.roomData?.name}</p>
            <p>{data?.typeData?.name}</p>

            <p>{dayjs(data?.timeCome).format('HH:mm:ss DD/MM/YYYY')}</p>
            <p>{dayjs(data?.timeGo).format('HH:mm:ss DD/MM/YYYY')}</p>
          </div>
        </div>
        <p className="font-bold">2. Thông tin thanh toán</p>
        <div className="flex border-b-2 border-black pb-2 border-dashed">
          <div className="w-[25%] font-bold">Nội dung</div>
          <div className="w-[25%] font-bold">Đơn giá</div>
          <div className="w-[25%] font-bold">Số lượng</div>
          <div className="w-[25%] font-bold">Thành tiền</div>
        </div>
        <div className="flex mt-3 pb-4">
          <div className="w-[25%]">Thời gian ở</div>
          <div className="w-[25%]">{formatCurrency(data?.typeData?.price)}</div>
          <div className="w-[25%]">
            {dayjs(data?.timeGo).startOf('day').diff(dayjs(data?.timeCome).startOf('day'), 'day')}
          </div>
          <div className="w-[25%]">{formatCurrency(data?.price)}</div>
        </div>

        {data?.services?.length > 0 &&
          data?.services.map((item) => {
            return (
              <div className="flex border-t-2 border-black py-4 border-dashed" key={item?.id}>
                <div className="w-[25%]">{item?.name}</div>
                <div className="w-[25%]">{formatCurrency(item?.price)}</div>
                <div className="w-[25%]">{item?.BookingService?.quantity}</div>
                <div className="w-[25%]">
                  {formatCurrency(item?.price * item?.BookingService?.quantity)}
                </div>
              </div>
            );
          })}

        <div className="flex border-t-2 border-black pt-4 border-dashed">
          <div className="w-[25%] font-bold">Tổng thanh toán</div>
          <div className="w-[25%]"></div>
          <div className="w-[25%]"></div>
          <div className="w-[25%]">{formatCurrency(totalPrice)}</div>
        </div>
      </div>
    </div>
  );
});

Bill.displayName = 'Bill';
