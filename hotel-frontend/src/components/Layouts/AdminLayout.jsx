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
