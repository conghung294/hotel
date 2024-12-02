import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [txnRef, setTxnRef] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get('code');
    const txnRef = params.get('txnRef');

    setTxnRef(txnRef);
    if (responseCode === '00') {
      setStatus('Thanh toán thành công!');
    } else {
      setStatus('Thanh toán thất bại!');
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">{status}</h1>
        {status === 'Thanh toán thành công!' && (
          <p className="text-xl text-gray-700">
            Mã giao dịch: <span className="font-semibold text-blue-600">{txnRef}</span>
          </p>
        )}
        <div className="mt-6">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
