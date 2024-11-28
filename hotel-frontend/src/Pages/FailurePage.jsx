import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FailurePage = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get('code');

    if (responseCode === '97') {
      setStatus('Chữ ký không hợp lệ. Thanh toán không thành công.');
    } else {
      setStatus('Thanh toán thất bại!');
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">{status}</h1>
        <div className="mt-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
