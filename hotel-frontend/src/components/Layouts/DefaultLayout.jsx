/* eslint-disable react/prop-types */

import Footer from '../Footer';
import HeaderHome from '../Header/HeaderHome';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HeaderHome />
      {children}
      <Footer />
    </>
  );
};
export default DefaultLayout;
