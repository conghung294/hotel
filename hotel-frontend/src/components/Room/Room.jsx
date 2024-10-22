/* eslint-disable react/prop-types */
import { Button } from 'antd';
import { formatCurrency } from '../../utils/CommonUtils';

const Room = ({ image, price, name, description, quantity, setChoiceRoom, room }) => {
  const handleChoiceRooom = () => {
    setChoiceRoom(room);
  };
  return (
    <div className="border p-4 flex justify-between items-center bg-white rounded-lg shadow-lg h-[200px] w-full">
      <div className="flex-shrink-0 w-[270px] h-[180px] rounded-lg overflow-hidden">
        <img src={image} alt="Room" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 px-4 h-full flex flex-col justify-between ">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          {/* <div className="text-gray-500 flex items-center space-x-2 mt-5">
            <span>1 người lớn, 1 trẻ em</span>
            <Tooltip title="Thông tin phòng">
              <InfoCircleOutlined />
            </Tooltip>
          </div> */}
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        {/* <div className="text-blue-500 mt-6">Chi tiết →</div> */}
      </div>

      <div className="flex flex-col justify-between border-l-2 pl-4  h-full w-[180px]">
        <div className="text-xl font-semibold text-black flex justify-center gap-2">
          {formatCurrency(price)}
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-red-500 ">Còn {quantity} phòng trống</span>
          <Button type="primary" className="w-full mt-4" onClick={() => handleChoiceRooom()}>
            Chọn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Room;
