/* eslint-disable react/prop-types */
import HeaderAdmin from '../Header/HeaderAdmin';

const AdminLayout = ({ children }) => {
  return (
    <>
      <HeaderAdmin />
      {children}
    </>
  );
};

export default AdminLayout;
