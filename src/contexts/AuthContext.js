import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import getAllUsers from '../api/users';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const fetchData = async () => {
        try {
          const usersData = await getAllUsers();

          const user = usersData.data.find(
            (user) => user.username === username,
          );
          setCurrentUser(user);
        } catch (error) {
          console.error(
            'An error occurred while fetching data:',
            error,
          );
        }
      };

      fetchData();
    }
  }, []);

  const login = async (username, token) => {
    try {
      const usersData = await getAllUsers();
      const user = usersData.data.find(
        (user) => user.username === username,
      );
      setCurrentUser(user);
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({ currentUser, login, logout }),
    [currentUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
