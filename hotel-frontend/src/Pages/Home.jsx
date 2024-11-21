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
        <div className="home-background1"></div>
        <div className="home-background2"></div>
        <div className="home-background3"></div>
      </Carousel>

      <div className="px-[27%] flex flex-col items-center mt-20 text-[#333333] text-[14px]">
        <div>Nơi giao thoa giữa lòng hiếu khách lâu đời của Hội An và phong cách sống hiện đại</div>
        <div className="mt-6 text-[60px] text-[#778788] big-title relative whitespace-nowrap">
          Nơi Hội Tụ Mọi Tinh Hoa
        </div>
        <div className="mt-6 text-[#333333] leading-6 text-[14px] text-center">
          Hòa mình vào nhịp sống sôi động tại khu nghỉ dưỡng mới nhất tại Hội An, một nơi nghỉ dưỡng
          hiện đại mang đậm dấu ấn di sản, nơi giao thoa văn hóa quốc tế đáng tự hào trong quá khứ
          hòa quyện với lòng hiếu khách nồng hậu ở thời điểm hiện tại.
        </div>
        <div className="mt-6 text-[#333333] leading-6 text-[14px] text-center">
          Chỉ cách phố cổ Hội An – một di sản văn hóa thế giới được UNESCO công nhận – với 10 phút
          đi bộ, Wafaifo Resort Hoi An chào đón bạn đến với không gian hiếu khách đậm chất Việt Nam,
          hòa mình vào phong cách sống hiện đại ngày nay.
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
          <div className="background-roomtype"></div>
        </div>
        <div
          className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]"
          id="room-type"
        >
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
                <div className="text-[32px]  hover:opacity-80 cursor-pointer">
                  Wafaifo Resort Hoi An
                </div>
                <div>Resort ★★★★★ - Hội An, Quảng Nam</div>
                <div>328 Lý Thường Kiệt, Hội An, Tân An, Quảng Nam,</div>
                <div>560000, Vietnam</div>
                <div>Phone +84 235 378 6999</div>
                <div>E-mail info@wafaifo.com</div>
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
