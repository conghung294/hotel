import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [responseCode, setResponseCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code'); // Mã trạng thái giao dịch
    const txnRef = params.get('txnRef'); // Mã giao dịch
    setTxnRef(txnRef);

    if (code === '00') {
      setStatus('Thanh toán thành công!');
      setResponseCode(code);
    } else {
      setStatus('Thanh toán thất bại!');
      setResponseCode(code);
    }
  }, [location]);

  const handleRedirect = () => {
    navigate('/'); // Chuyển hướng về trang chủ hoặc một trang khác sau khi nhấn nút
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        responseCode === '00' ? 'bg-green-50' : 'bg-red-50'
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1
          className={`text-3xl font-bold ${
            responseCode === '00' ? 'text-green-500' : 'text-red-500'
          } mb-4`}
        >
          {status}
        </h1>
        {responseCode === '00' && (
          <p className="text-xl text-gray-700 mb-4">
            Mã giao dịch: <span className="font-semibold text-blue-600">{txnRef}</span>
          </p>
        )}
        <div className="mt-6">
          <button
            onClick={handleRedirect}
            className={`${
              responseCode === '00' ? 'bg-green-500' : 'bg-red-500'
            } text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors`}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
