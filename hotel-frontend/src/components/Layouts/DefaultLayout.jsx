/* eslint-disable react/prop-types */

import HeaderHome from '../Header/HeaderHome';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HeaderHome />
      {children}
    </>
  );
};
export default DefaultLayout;
