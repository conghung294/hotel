import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRoomService } from '../../service/roomService';
import { getDailyRoomUse, getRevenue } from '../../service/bookingService';
import { Chart as ReactChartJs } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import viVN from 'antd/lib/locale/vi_VN';
import { formatCurrency } from '../../utils/CommonUtils';

// Đăng ký các thành phần của Chart.js
ChartJS.register(...registerables);

const AdminPage = () => {
  const [rooms, setRooms] = useState([]);
  const [dailyUse, setDailyUse] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedMonth2, setSelectedMonth2] = useState(dayjs());
  const [revenueToday, setRevenueToday] = useState(0);

  const getRoom = async () => {
    const res = await getRoomService('ALL');
    const dataWithKeys = res?.data?.map((item) => ({
      ...item,
      key: item?.id,
    }));
    if (res.errCode === 0) {
      setRooms(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  };

  const getDailyUse = async (month, year) => {
    const res = await getDailyRoomUse(month, year); // Truyền tháng và năm
    const dataWithKeys = res?.data?.dailyUsage?.map((item) => ({
      ...item,
      key: item?.id,
    }));
    if (res.errCode === 0) {
      setDailyUse(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetRevenue = useCallback(async (month) => {
    const res = await getRevenue(month);
    if (month === `${new Date().getFullYear()}-${new Date().getMonth() + 1}`) {
      const now = new Date();
      const localDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const today = localDate.toISOString().split('T')[0];
      const todayRevenue =
        res?.data?.revenueData.find((item) => item.day === today)?.totalRevenue || 0;
      setRevenueToday(todayRevenue);
    }
    const dataWithKeys = res?.data?.revenueData?.map((item, index) => ({
      ...item,
      key: index,
    }));
    if (res.errCode === 0) {
      setRevenue(dataWithKeys);
    } else {
      toast.error(res?.message);
    }
  }, []);

  const emptyRoomsCount = rooms.filter((room) => room?.status === 'ĐANG TRỐNG').length;
  const usedRoomsCount = rooms.filter((room) => room?.status === 'ĐANG SỬ DỤNG').length;

  const chartData = {
    labels: dailyUse?.map((item) => `${item?.date?.split('-')[2]}`),
    datasets: [
      {
        label: 'Công suất sử dụng phòng (%)',
        data: dailyUse?.map((item) => item?.usagePercentage),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4, // Độ cong của đường
      },
    ],
  };

  const barData = {
    labels: revenue?.map((item) => `${item?.day?.split('-')[2]}`),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: revenue?.map((item) => item?.totalRevenue),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình tùy chọn hiển thị
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn gạch dọc
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn gạch dọc
        },
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    const selectedYear = date.year();
    const selectedMonth = date.month() + 1; // Tháng trong dayjs bắt đầu từ 0
    getDailyUse(selectedMonth, selectedYear);
  };

  const handleMonthChange2 = (date) => {
    setSelectedMonth2(date);
    const selectedYear = date.year();
    const selectedMonth = date.month() + 1; // Tháng trong dayjs bắt đầu từ 0
    handleGetRevenue(`${selectedYear}-${selectedMonth}`);
  };

  useEffect(() => {
    getRoom();
    getDailyUse(new Date().getMonth() + 1, new Date().getFullYear());
  }, []);

  useEffect(() => {
    handleGetRevenue(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
  }, [handleGetRevenue]);

  return (
    <div className=" h-[80vh]">
      <div className="flex items-center justify-center gap-10 h-[110px] bg-white">
        <div className="w-[24%] shadow-lg h-full rounded-lg p-4 border-red-400 bg-red-400">
          <div className="text-[26px] text-white">Tổng số phòng</div>
          <div className="text-[26px] mt-4 text-white">{rooms?.length || 0}</div>
        </div>
        <div className="w-[24%] shadow-lg h-full rounded-lg p-4 bg-blue-400">
          <div className="text-[26px] text-white">Số phòng trống</div>
          <div className="text-[26px] mt-4 text-white ">
            {emptyRoomsCount} ({Math.floor((emptyRoomsCount / rooms?.length) * 100)}%)
          </div>
        </div>
        <div className="w-[24%] shadow-lg h-full rounded-lg p-4 bg-yellow-400">
          <div className="text-[26px] text-white">Đang sử dụng</div>
          <div className="text-[26px] mt-4 text-white">
            {usedRoomsCount} ({100 - Math.floor((emptyRoomsCount / rooms?.length) * 100)}%)
          </div>
        </div>
        <div className="w-[28%] shadow-lg h-full rounded-lg p-4 bg-green-400">
          <div className="text-[26px] text-white">Doanh thu hôm nay</div>
          <div className="text-[26px] mt-4 text-white">{formatCurrency(revenueToday)} </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-3 items-center">
          <div className="font-bold text-[18px]">Công suất sử dụng phòng</div>
          <div>
            <ConfigProvider locale={viVN}>
              <DatePicker
                picker="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                format="MMMM - YYYY"
                allowClear={false}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className="flex-1 mt-3">
          <div className="w-[1200px] chart-container">
            <ReactChartJs
              type="line"
              key={selectedMonth.toString()}
              data={chartData}
              options={options}
              style={{
                width: '100%', // Chiều rộng chiếm toàn bộ không gian
                height: '400px', // Chiều cao có thể điều chỉnh tùy thích
              }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-3 items-center">
          <div className="font-bold text-[18px]">
            Doanh thu (Chỉ tính những đơn đặt phòng thành công)
          </div>
          <div>
            <ConfigProvider locale={viVN}>
              <DatePicker
                picker="month"
                value={selectedMonth2}
                onChange={handleMonthChange2}
                format="MMMM - YYYY"
                allowClear={false}
              />
            </ConfigProvider>
          </div>
        </div>

        <div className="bar-container py-3">
          <ReactChartJs
            type="bar"
            key={selectedMonth2.toString()}
            data={barData}
            options={options2}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
