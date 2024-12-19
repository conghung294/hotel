import { FaFacebook, FaInstagramSquare, FaLinkedin, FaPhone } from 'react-icons/fa';
import { TiSocialYoutube } from 'react-icons/ti';
import { GrLocation } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
const Footer = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 bg-[#282A35] mt-16 text-white">
      <div className="flex gap-10 items-center justify-center">
        <FaFacebook size={30} />
        <TiSocialYoutube size={30} />
        <FaInstagramSquare size={30} />
        <FaLinkedin size={30} />
      </div>
      <div className="flex gap-2 items-center">
        <GrLocation size={20} /> 190 Nguyễn Chí Thanh, thành phố Đà Lạt, 560000, Vietnam
      </div>
      <div className="flex gap-2 items-center">
        <FaPhone />
        +84 235 123 7000
      </div>
      <div className="flex gap-2 items-center">
        <MdEmail />
        info@phuonghoa.com
      </div>
      <div>© Copyright Green Hill Da Lat 2024</div>
    </div>
  );
};

export default Footer;
