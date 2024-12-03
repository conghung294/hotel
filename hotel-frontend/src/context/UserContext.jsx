import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getAccount } from '../service/userService';

// Tạo context
export const UserContext = createContext(null);

// Provider để cung cấp context cho các component con
export const UserProvider = ({ children }) => {
  const userDefault = useMemo(
    () => ({
      id: '',
      email: '',
      name: '',
      roleId: '',
    }),
    [] // Không có dependencies, chỉ khởi tạo một lần
  );
  const [user, setUser] = useState(userDefault);

  const loginContext = (userData) => {
    setUser({ ...userData });
  };

  const logoutContext = () => {
    setUser({ ...userDefault });
  };

  const fetchUser = useCallback(async () => {
    let response = await getAccount();
    if (response && response.EC === 0) {
      let id = response.DT.id;
      let email = response.DT.email;
      let name = response.DT.name;
      let roleId = response.DT.roleId;

      let data = {
        id,
        email,
        name,
        roleId,
      };
      setUser({ ...data });
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      fetchUser();
    } else {
      // setUser({ ...user });
    }
  }, [fetchUser]);
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
