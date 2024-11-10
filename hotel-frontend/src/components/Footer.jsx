import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { TiSocialYoutube } from 'react-icons/ti';

const Footer = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 bg-[#EEECE7] mt-16">
      <div className="flex gap-10 items-center justify-center">
        <FaFacebook size={30} color="blue" />
        <TiSocialYoutube size={30} color="red" />
        <FaInstagramSquare size={30} color="pink" />
        <FaLinkedin size={30} color="#0077B5" />
      </div>
      <div>328 Lý Thường Kiệt, Tân An, Hội An, Quảng Nam, 560000, Vietnam</div>
      <div>Phone +84 235 378 6999</div>
      <div>info@wafaifo.com</div>
      <div>© Copyright Wafaifo Resort Hoi An 2024</div>
    </div>
  );
};

export default Footer;
