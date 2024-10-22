/* eslint-disable react/prop-types */
import { Button } from 'antd';
import { useState } from 'react';

import { formatCurrency } from '../../utils/CommonUtils';

const Service = ({
  image,
  price,
  name,
  description,
  setChoiceService,
  service,
  choiceServices,
}) => {
  const [isChoice, setIsChoice] = useState(false);

  const handleChoiceService = () => {
    setIsChoice(true);
    const updatedServices = [...choiceServices, service];
    setChoiceService(updatedServices);
  };

  const handleUnChoiceService = () => {
    setIsChoice(false);

    const updatedServices = choiceServices.filter((item) => item.id !== service.id);

    setChoiceService(updatedServices);
  };
  return (
    <div className="border p-4 flex justify-between items-center bg-white rounded-lg shadow-lg h-[200px] w-full">
      <div className="flex-shrink-0 w-[270px] h-[180px] rounded-lg overflow-hidden">
        <img src={image} alt="Room" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 px-4 h-full flex flex-col justify-between ">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>

          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        {/* <div className="text-blue-500 mt-6">Chi tiết →</div> */}
      </div>

      <div className="flex flex-col justify-between border-l-2 pl-4  h-full w-[180px]">
        <div className="text-xl font-semibold text-black flex justify-center gap-2">
          {formatCurrency(price)}
        </div>
        <div className="flex flex-col justify-center items-center">
          {isChoice ? (
            <Button className="w-full mt-4" onClick={() => handleUnChoiceService()}>
              Bỏ chọn
            </Button>
          ) : (
            <Button type="primary" className="w-full mt-4" onClick={() => handleChoiceService()}>
              Chọn
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;
