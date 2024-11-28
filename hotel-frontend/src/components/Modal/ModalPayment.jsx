import { InputNumber, Modal } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';
import dayjs from 'dayjs';
import { useCallback, useRef, useState } from 'react';
import { Bill } from '../Print/Bill';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import { checkOutService } from '../../service/roomService';

const ModalPayment = ({ modalOpen, setModalOpen, data, getRoom, setModalCheckOutOpen }) => {
  const printRef = useRef(null);
  const [sale, setSale] = useState(0);
  const [open, setOpen] = useState(modalOpen);

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

  const handleAfterPrint = useCallback(() => {
    setModalOpen(false);
    setOpen(false);
    setModalCheckOutOpen(false);
    getRoom();
    toast.success('Trả phòng thành công!');
  }, [getRoom, setModalCheckOutOpen, setModalOpen]);

  const handleBeforePrint = useCallback(() => {
    return Promise.resolve();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Hóa Đơn Thanh Toán',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleSubmit = async () => {
    const res = await checkOutService({
      bookingId: data?.id,
      roomId: data?.roomId,
      sale: sale,
      paid: (totalPrice * (100 - sale)) / 100,
      price: (totalPrice * (100 - sale)) / 100,
    });
    if (res.errCode === 0) {
      handlePrint();
    } else {
      toast.error('Thất bại!');
    }
  };

  return (
    <Modal
      title={'Trả phòng và thanh toán'}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      className="!w-[60%]"
      footer={false}
    >
      <div className="flex">
        <div className="w-[66%] border-r pr-5">
          <div className="flex p-2 mt-3 bg-[#E4F2ED] rounded-md">
            <div className="w-[46%] font-bold ">Thông tin phòng</div>
            <div className="w-[18%] font-bold flex-1">Đơn giá</div>
            <div className="w-[18%] font-bold flex-1">Thời gian</div>
            <div className="w-[18%] font-bold flex-1">Thành tiền</div>
          </div>
          <div className="flex mt-3 pb-4 px-2">
            <div className="w-[46%]">{data?.typeData?.name}</div>
            <div className="w-[18%] flex-1">{formatCurrency(data?.typeData?.price)}</div>
            <div className="w-[18%] flex-1">
              {dayjs(data?.timeGo).startOf('day').diff(dayjs(data?.timeCome).startOf('day'), 'day')}{' '}
              ngày
            </div>
            <div className="w-[18%] flex-1">{formatCurrency(data?.price)}</div>
          </div>
          <div className="flex p-2 mt-1 bg-[#E4F2ED] rounded-md">
            <div className="w-[46%] font-bold">Dịch vụ</div>
            <div className="w-[18%] font-bold flex-1">Đơn giá</div>
            <div className="w-[18%] font-bold flex-1">Số lượng</div>
            <div className="w-[18%] font-bold flex-1">Thành tiền</div>
          </div>

          {data?.services?.length > 0 ? (
            data?.services.map((item, index) => {
              return (
                <div className="flex py-4 px-2 border-b border-[#ccc]" key={item?.id}>
                  <div className="w-[46%]">
                    <span>{`${index + 1}.`}</span>
                    <span className="ml-3">{item?.name}</span>
                  </div>
                  <div className="w-[18%] flex-1">{formatCurrency(item?.price)}</div>
                  <div className="w-[18%] flex-1">{item?.BookingService?.quantity}</div>
                  <div className="w-[18%] flex-1">
                    {formatCurrency(item?.price * item?.BookingService?.quantity)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mt-3 flex-1">Không có</div>
          )}
        </div>
        <div className="w-[34%] pl-5 mt-5">
          <div className="flex justify-between">
            <div className="">Tổng cộng</div>
            <div className="font-bold">{formatCurrency(totalPrice)}</div>
          </div>

          <div className="flex justify-between mt-3 items-center">
            <div className="">Giảm giá (%)</div>
            <InputNumber
              min={0}
              max={100}
              style={{ width: '60px' }}
              value={sale}
              onChange={(value) => setSale(value)}
            />
          </div>

          <div className="flex justify-between mt-3">
            <div className="">Đã thanh toán</div>
            <div className="">{formatCurrency(data?.paid)}</div>
          </div>

          <div className="flex justify-between mt-3 border-t pt-4 items-center">
            <div className="font-bold">Còn cần trả</div>
            <div className="text-[20px] text-green-600 font-bold">
              {formatCurrency((totalPrice * (100 - sale)) / 100 - data?.paid)}
            </div>
          </div>

          <div
            className="bg-[#009952] text-white flex-1 mt-5 font-bold rounded-md hover:opacity-90 cursor-pointer py-2"
            onClick={() => handleSubmit()}
          >
            Hoàn thành
          </div>
        </div>
      </div>
      <div className="hidden">
        <Bill ref={printRef} data={{ ...data, sale }} />
      </div>
    </Modal>
  );
};

export default ModalPayment;
