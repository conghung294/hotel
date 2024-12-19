import { Button, Carousel } from 'antd';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const nagivate = useNavigate();
  const handleClickViewMap = () => {
    nagivate('/location');
  };
  return (
    <>
      <Carousel autoplay>
        <div className="home-background1 relative">
          <div className=" text-overlay">GREEN HILL</div>
        </div>
        <div className="home-background2 relative">
          <div className=" text-overlay">GREEN HILL</div>
        </div>
        <div className="home-background3 relative">
          <div className=" text-overlay">GREEN HILL</div>
        </div>
      </Carousel>

      <div className="px-[27%] flex flex-col items-center mt-20 text-[#333333] text-[14px]">
        <div>Điểm Dừng Chân Xanh Mát Giữa Lòng Đà Lạt</div>
        <div className="mt-6 text-[60px] text-[#778788] big-title relative whitespace-nowrap">
          Nơi Hội Tụ Mọi Tinh Hoa
        </div>
        <div className="mt-6 text-[#333333] leading-6 text-[14px] text-center">
          Tọa lạc giữa đồi thông xanh mướt và không gian yên bình của thành phố ngàn hoa, Green Hill
          Homestay mang đến cho bạn một chốn dừng chân lý tưởng để hòa mình vào thiên nhiên Đà Lạt.
          Với kiến trúc mộc mạc, ấm cúng, từng góc nhỏ của Green Hill đều được chăm chút tỉ mỉ để
          tạo cảm giác thoải mái như ở nhà.
        </div>
        <div className="mt-6 text-[#333333] leading-6 text-[14px] text-center">
          Từ ban công phòng, bạn có thể ngắm sương sớm vờn quanh thung lũng, thưởng thức tách cà phê
          thơm nồng hay đơn giản là tận hưởng những phút giây lắng đọng giữa rừng thông xanh biếc.
          Không chỉ là nơi nghỉ dưỡng, Green Hill còn là nơi lưu giữ những khoảnh khắc yên bình và
          cảm xúc trong lành của Đà Lạt.
        </div>
      </div>

      <div className="flex px-20 mt-20 ">
        <div className="w-1/2 ">
          <div className="background-roomtype"></div>
        </div>
        <div
          className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]"
          id="room-type"
        >
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Lựa chọn không gian riêng tư và tận hưởng cảm giác ấm cúng như tại ngôi nhà của chính
            mình
          </div>
          <Link
            className="text-[60px] text-[#778788] big-title relative hover:opacity-80 cursor-pointer"
            to="/room-type"
          >
            Hạng Phòng
          </Link>
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Khám phá sự kết hợp hoàn hảo giữa tiện nghi hiện đại và sự thoải mái tại WAFAIFO RESORT
            HOI AN, nơi mang đến cho bạn những trải nghiệm nghỉ dưỡng sang trọng trong không gian
            phòng rộng rãi và trang bị đầy đủ tiện nghi. Mỗi phòng đều hướng về khu vực Swim City
            sôi động hoặc khu vườn xanh mát của khu nghỉ dưỡng. Hãy chọn một không gian riêng tư tại
            WAFAIFO, nơi mọi mong đợi của bạn sẽ được đáp ứng!
          </div>
        </div>
      </div>

      <div className="flex px-20 flex-row-reverse" id="entertainment">
        <div className="w-1/2 ">
          <div className="background-entertainment"></div>
        </div>
        <div className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]">
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Khám phá những trải nghiệm độc đáo và đa dạng ngay tại khu nghỉ dưỡng
          </div>
          <Link
            className="text-[60px] text-[#778788] big-title relative hover:opacity-80 cursor-pointer"
            to="/entertainment"
          >
            GIẢI TRÍ
          </Link>
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Chúng tôi tự hào mang đến cho du khách và cộng đồng địa phương những sự kiện và hoạt
            động đáng nhớ, thú vị. Hứa hẹn mang đến cho bạn những trải nghiệm bất ngờ, khác lạ, tất
            cả tại một vị trí thuận tiện ngay trung tâm thành phố Hội An – nơi hội tụ những điều
            tuyệt vời từ Hội An, Việt Nam và cộng đồng quốc tế.
          </div>
        </div>
      </div>

      <div className="flex px-20" id="cuisine">
        <div className="w-1/2 ">
          <div className="background-cuisine"></div>
        </div>
        <div
          className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]"
          id="room-type"
        >
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Trải nghiệm ẩm thực đầy màu sắc, món ngon địa phương và nhiều điều mới mẻ
          </div>
          <Link
            className="text-[60px] text-[#778788] big-title relative hover:opacity-80 cursor-pointer"
            to="/cuisine"
          >
            ẨM THỰC
          </Link>
          <div className="text-[#333333] leading-6 text-center text-[14px]">
            Hãy khám phá những hương vị tinh tế và không gian sôi động được thiết kế dành riêng cho
            những người yêu thích ẩm thực Hội An, những du khách muốn khám phá, những tín đồ ẩm thực
            sáng tạo, người sành ẩm thực Việt Nam hoặc những người yêu thích Instagram đang tìm kiếm
            những khoảnh khắc ngọt ngào và thú vị.
          </div>
        </div>
      </div>

      <div className="px-20 flex mt-10">
        <div className="w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8283328437856!2d105.84772707508004!3d20.999517380642494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac730ff81323%3A0x9032c0dde07a324c!2zNDAwIFAuIELhuqFjaCBNYWksIELhuqFjaCBNYWksIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1731160759327!5m2!1sen!2sus"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="w-1/2">
          <div className="background-location flex items-center justify-center w-full h-full">
            <div className="w-[450px] h-[280px] bg-white z-10 flex items-center justify-center ">
              <div className="h-[calc(100%-8px)] w-[calc(100%-8px)] border border-gray-400 flex flex-col items-center  text-[#778788] justify-around">
                <div className="text-[32px]  hover:opacity-80 cursor-pointer">PH Hotel Hoi An</div>
                <div>Hotl ★★★★★</div>
                <div>400 Bạch Mai, Hai bà Trưng, Hà Nội</div>
                <div>560000, Vietnam</div>
                <div>Phone +84 235 123 7000</div>
                <div>E-mail info@phuonghoa.com</div>
                <Button type="primary" onClick={() => handleClickViewMap()}>
                  View on map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
