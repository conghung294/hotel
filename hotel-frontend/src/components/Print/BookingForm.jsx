import { forwardRef } from 'react';
import { formatCurrency } from '../../utils/CommonUtils';
import dayjs from 'dayjs';

export const BookingForm = forwardRef((props, ref) => {
  const { data } = props;

  return (
    <div ref={ref} className="flex justify-center items-center mt-20">
      <div className="w-[80%]">
        <div className="flex">
          <div className="w-[30%] font-bold text-[30px] flex-1">GREEN HILL</div>
          <div className="flex flex-col items-center gap-3 w-[70%]">
            <div>Green Hill Đà Lạt</div>
            <div>112 Nguyễn Văn Trỗi, Đà Lạt</div>
            <div>T +84 98 348 06 36 E phuonghoalt@gmail.com</div>
            <div>www.greenhill.com</div>
          </div>
        </div>
        <div className="text-center font-bold text-lg mb-5 mt-6">PHIẾU ĐẶT PHÒNG</div>
        <p className="font-bold mt-4">1. Thông tin khách hàng</p>
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
            <p>{data?.user?.name || 'Không có'}</p>
            <p>{data?.user?.phoneNumber || 'Không có'}</p>
            <p>{data?.user?.cccd || 'Không có'}</p>
            <p>{data?.user?.gender || 'Không có'}</p>
            <p>{data?.user?.address || 'Không có'}</p>
            <p>{data?.user?.email || 'Không có'}</p>
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
            <p>{data?.name}</p>
            <p>{data?.roomtypeData?.name}</p>

            <p>{dayjs(data?.timeCome).format('DD/MM/YYYY')}</p>
            <p>{dayjs(data?.timeGo).format('DD/MM/YYYY')}</p>
          </div>
        </div>
        <p className="font-bold">3. Thông tin thanh toán</p>
        <div className="flex border-b-2 border-black pb-2 border-dashed">
          <div className="w-[25%] font-bold">Nội dung</div>
          <div className="w-[25%] font-bold">Đơn giá</div>
          <div className="w-[25%] font-bold">Số lượng</div>
          <div className="w-[25%] font-bold">Thành tiền</div>
        </div>
        <div className="flex mt-3 pb-4">
          <div className="w-[25%]">{data?.roomtypeData?.name}</div>
          <div className="w-[25%]">{formatCurrency(data?.roomtypeData?.price)}</div>
          <div className="w-[25%]">
            {dayjs(data?.timeGo).startOf('day').diff(dayjs(data?.timeCome).startOf('day'), 'day')}
          </div>
          <div className="w-[25%]">
            {formatCurrency(
              dayjs(data?.timeGo).startOf('day').diff(dayjs(data?.timeCome).startOf('day'), 'day') *
                data?.roomtypeData?.price
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

BookingForm.displayName = 'BookingForm';
