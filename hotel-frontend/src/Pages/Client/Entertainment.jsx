import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image5 from '../../assets/image/image5.jpg';
import image6 from '../../assets/image/image6.jpg';
import image7 from '../../assets/image/image7.jpg';
import image8 from '../../assets/image/image8.jpg';
import image9 from '../../assets/image/image9.jpg';
import image10 from '../../assets/image/image10.jpg';
import { Image } from 'antd';

const images = [image5, image6, image7, image8, image9, image10];
const Entertainment = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,

          speed: 500,
          arrows: false,
          slidesToShow: 2.2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col items-center justify-center mt-20 relative">
      <div className="w-[800px] z-10 absolute top-[80px]">
        <div className="flex flex-col items-center px-[10%] justify-around bg-white" id="room-type">
          <div className="text-[#333333] leading-8 text-center text-[18px]">
            Khám phá những trải nghiệm độc đáo và đa dạng ngay tại khu nghỉ dưỡng
          </div>
          <div className="text-[70px] text-[#778788] big-title relative mt-10">GIẢI TRÍ</div>
          <div className="px-10">
            <div className="text-[#333333] leading-8 text-[16px] mt-10">
              Hãy thưởng thức những bộ phim đặc sắc, cổ vũ cho các trận đấu thể thao trực tiếp, tận
              hưởng những khung giờ khuyến mãi hấp dẫn, trở thành đầu bếp chuyên nghiệp trong các
              lớp học nấu ăn, rèn luyện sức khỏe với các lớp học thể dục, thả mình theo những giai
              điệu của DJ, khám phá hương vị ẩm thực độc đáo, và lắng nghe những bài diễn thuyết từ
              các khách mời đặc biệt. WAFAIFO RESORT HOI AN tự hào khi mang đến cho bạn trải nghiệm
              giải trí phong phú, dù bạn chưa từng thử trước đây!
            </div>
            <div className="text-[#333333] leading-8 mt-4 text-[16px]">
              Chúng tôi tự hào mang đến cho du khách và cộng đồng địa phương những sự kiện và hoạt
              động đáng nhớ, thú vị. Hứa hẹn mang đến cho bạn những trải nghiệm bất ngờ, khác lạ,
              tất cả tại một vị trí thuận tiện ngay trung tâm thành phố Hội An – nơi hội tụ những
              điều tuyệt vời từ Hội An, Việt Nam và cộng đồng quốc tế.
            </div>
            <div className="text-[#333333] leading-8 mt-4 text-[16px] pb-10">
              Hãy theo dõi chúng tôi để cập nhật thông tin chi tiết về những hoạt động và sự kiện
              thú vị sắp tới.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mt-[200px]">
        <div className="bg-entertainment"></div>
      </div>

      <div className="h-[350px] w-[90%] mt-10">
        <Slider {...settings}>
          {images.map((item, index) => {
            return (
              <div className="text-link" key={index}>
                <div className="section-customize">
                  <Image src={item} width={'100%'} height={'260px'} />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default Entertainment;
