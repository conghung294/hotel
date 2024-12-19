function Location() {
  return (
    <>
      <div className="w-full mt-16">
        <div className="bg-location flex items-center justify-center flex-col text-white text-[20px]">
          <div className="tracking-wider">Một điểm đến lý tưởng giữa thiên nhiên Đà Lạt</div>
          <div className="text-[60px] font-bold mt-10">Tọa lạc tại trung tâm</div>
          <div className="text-[60px] font-bold">thành phố Đà Lạt</div>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        <div className="w-[800px] z-10 absolute top-[80px]">
          <div className="flex flex-col items-center px-[10%] justify-around bg-white pb-20">
            <div className="text-[#333333] leading-8 text-center text-[18px] tracking-wider">
              Cách chợ Đà Lạt chỉ vài phút đi bộ
            </div>
            <div className="text-[70px] text-[#778788] big-title relative mt-10 text-center leading-50">
              Giữa Lòng Thành Phố Ngàn Hoa
            </div>
            <div className="px-10">
              <div className="text-[#333333] leading-8 text-[16px] mt-10">
                GREEN HILL hotel tọa lạc tại vị trí tuyệt đẹp ngay trung tâm thành phố Đà Lạt, trên
                đường Trần Phú, gần với các điểm tham quan nổi tiếng như chợ Đà Lạt và Hồ Xuân
                Hương. Từ đây, du khách có thể dễ dàng tản bộ trong vòng 5-10 phút để khám phá vẻ
                đẹp của thành phố.
              </div>
              <div className="text-[#333333] leading-8 mt-4 text-[16px]">
                Ngoài ra, từ khách sạn, du khách có thể thuận tiện đi tham quan các địa điểm du lịch
                nổi tiếng như Thung Lũng Tình Yêu hoặc Langbiang với khoảng 20-30 phút di chuyển
                bằng xe. GREEN HILL hotel cũng chỉ cách sân bay Liên Khương khoảng 30 phút lái xe.
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.281509936568!2d108.4385517!3d11.94041945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317113b5efc9a9d3%3A0x9e5c041ff2d3968b!2zTMOqIFRo4bq3bmcsIFbhuqFuIEto4bq_IEThu6sgTOG6o3Q!5e0!3m2!1svi!2s!4v1734614278456!5m2!1svi!2s"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Location;
