import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser({ username });
    }
  }, []);

  const login = (username, token) => {
    setCurrentUser({ username });
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
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
