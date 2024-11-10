function Locaion() {
  return (
    <>
      <div className="w-full mt-16">
        <div className="bg-location flex items-center justify-center flex-col text-white text-[20px]">
          <div className="tracking-wider">Một điểm đến thuận tiện ngay giữa lòng phố Hội</div>
          <div className="text-[60px] font-bold mt-10">Tọa lạc tại trung tâm</div>
          <div className="text-[60px] font-bold">thành phố</div>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        <div className="w-[800px] z-10 absolute top-[80px]">
          <div className="flex flex-col items-center px-[10%] justify-around bg-white pb-20">
            <div className="text-[#333333] leading-8 text-center text-[18px] tracking-wider">
              Cách phố cổ Hội An chỉ vài bước đi bộ
            </div>
            <div className="text-[70px] text-[#778788] big-title relative mt-10">
              Giữa Lòng Phố Hội
            </div>
            <div className="px-10">
              <div className="text-[#333333] leading-8 text-[16px] mt-10">
                WAFAIFO RESORT HOI AN nằm tại vị trí thuận tiện ngay trung tâm thành phố Hội An,
                trên tuyến đường Lý Thường Kiệt sầm uất gần ngã tư giao với tuyến đường Hai Bà
                Trưng. Từ đây, du khách có thể dễ dàng đi bộ thong thả chỉ với 10 phút để đến khu
                phố cổ bên bờ sông.
              </div>
              <div className="text-[#333333] leading-8 mt-4 text-[16px]">
                Bên cạnh đó, du khách có thể rẽ phải vào tuyến đường Hai Bà Trưng để đi biển với 10
                phút lái xe hoặc 30 phút đạp xe. Hội An cũng chỉ cách sân bay thành phố Đà Nẵng,
                trung tâm đô thị lớn thứ ba của Việt Nam, khoảng 30 phút lái xe.
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] mt-[200px]">
          <div className="bg-location-2"></div>
        </div>
      </div>
      <div className="px-[5%] mt-10 h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8283328437856!2d105.84772707508004!3d20.999517380642494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac730ff81323%3A0x9032c0dde07a324c!2zNDAwIFAuIELhuqFjaCBNYWksIELhuqFjaCBNYWksIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1731160759327!5m2!1sen!2sus"
          width="100%"
          height="100%"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Locaion;
