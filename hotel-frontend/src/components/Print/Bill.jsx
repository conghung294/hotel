/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import dayjs from 'dayjs';

export const Bill = forwardRef((props, ref) => {
  const { data } = props;

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
            <p>Giá phòng:</p>
            <p>Thời gian đến:</p>
            <p>Thời gian đi:</p>
            <p>Tổng số ngày:</p>
          </div>
          <div className="flex flex-col">
            <p>{data?.roomData?.name}</p>
            <p>{data?.typeData?.name}</p>
            <p>{`${formatCurrency(data?.typeData?.price)} / ngày`}</p>
            <p>{dayjs(data?.timeCome).format('HH:mm:ss DD/MM/YYYY')}</p>
            <p>{dayjs(data?.timeGo).format('HH:mm:ss DD/MM/YYYY')}</p>
            <p>
              {dayjs(data?.timeGo).startOf('day').diff(dayjs(data?.timeCome).startOf('day'), 'day')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Bill.displayName = 'Bill';
