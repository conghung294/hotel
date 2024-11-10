const Cuisine = () => {
  return (
    <div className="mt-32 flex justify-center items-center">
      <div className="flex justify-center items-center flex-col w-[90%] ">
        <div className="w-[1000px] top-[80px]">
          <div className="flex flex-col items-center px-[10%] justify-around bg-white">
            <div className="text-[#333333] leading-8 text-center text-[16px]">
              Trải nghiệm ẩm thực đầy màu sắc, món ngon địa phương và nhiều điều mới mẻ
            </div>
            <div className="text-[70px] text-[#778788] big-title relative mt-10">Ẩm thực</div>
            <div className="px-10">
              <div className="text-[#333333] leading-8 text-[14px] mt-10">
                Đặt chân đến WAFAIFO RESORT, bạn sẽ được hòa mình vào không gian ẩm thực và thức
                uống độc đáo của miền Trung Việt Nam.
              </div>
              <div className="text-[#333333] leading-8 mt-4 text-[14px]">
                Hãy khám phá những hương vị tinh tế và không gian sôi động được thiết kế dành riêng
                cho những người yêu thích ẩm thực Hội An, những du khách muốn khám phá, những tín đồ
                ẩm thực sáng tạo, người sành ẩm thực Việt Nam hoặc những người yêu thích Instagram
                đang tìm kiếm những khoảnh khắc ngọt ngào và thú vị.
              </div>
              <div className="text-[#333333] leading-8 mt-4 text-[14px] pb-10">
                Thưởng thức những trải nghiệm ẩm thực độc đáo chưa từng có tại Hội An, nơi giao thoa
                ẩm thực vượt thời gian, nơi gặp gỡ tình bạn cùng những hương vị khó phai.
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-20 w-full">
          <div className="w-1/2 ">
            <div className="background-cusine-1"></div>
          </div>
          <div className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]">
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Nếm sự tinh tế trong khai vị
            </div>
            <div className="text-[60px] text-[#778788] big-title relative">NEM</div>
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Phòng trải nghiệm NEM riêng tư, nằm liền bên nhà hàng XUA & NAY, mang đến sự kết hợp
              hoàn hảo giữa các loại rượu vang danh tiếng của thế giới từ xưa đến nay cùng những món
              tapas và phô mai tuyệt hảo không thể tìm thấy ở miền Trung Việt Nam.
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse w-full">
          <div className="w-1/2 ">
            <div className="background-cusine-2"></div>
          </div>
          <div className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]">
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Nhà hàng &quot;Bistro&quot; phục vụ cả ngày
            </div>
            <div className="text-[60px] text-[#778788] big-title relative">XUA & NAY</div>
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Nhà hàng XUA & NAY tự hào là một trong những điểm đến tuyệt vời trong khu vực, một
              không gian mở mời mọi người đến thưởng thức một tách cà phê sớm, bữa sáng nhanh gọn,
              bữa trưa thư giãn hoặc bữa tối đáng nhớ cùng bạn bè.
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2 ">
            <div className="background-cusine-3"></div>
          </div>
          <div className="w-1/2 flex flex-col items-center px-[10%] justify-around bg-[#F7F7F7]">
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Một không gian ẩm thực riêng tư, nơi bạn làm chủ trải nghiệm
            </div>
            <div className="text-[60px] text-[#778788] big-title relative">VUONG GIA</div>
            <div className="text-[#333333] leading-6 text-center text-[14px]">
              Phòng ăn riêng VUONG GIA (Royal Family) được thiết kế nhằm phục vụ cho các dịp gặp gỡ
              thân mật cùng bạn bè, gia đình, hoặc nhóm đối tác. Với không gian thân mật dành cho 12
              người, du khách có thể thưởng thức bữa ăn như hoàng gia và lưu giữ những khoảnh khắc
              đặc biệt cho kỳ nghỉ tiếp theo tại VUONG GIA.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuisine;
