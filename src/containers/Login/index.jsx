import './styles.scss';
import getAllUsers from '../../api/users.js';
import loginUser from '../../api/userLogin.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'Components/Button';

const Login = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // should I fetch users and validate them here on the array?
  // or should I fetch users and validate them on the api?
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        // console.log(response.data[0].email);
        console.log(response.data[0]);
        setUsers(response.data);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }
    };
    fetchAllUsers();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      if (response.token) {
        console.log('Login successful');
        navigate('/');
      }
    } catch (error) {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  const handleInputChange = (inputSetter) => (e) => {
    if (error) setError(null);
    inputSetter(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="login__input-section">
        <div className="input-wrapper">
          <i className="fa-regular fa-user"></i>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={handleInputChange(setUsername)}
          />
        </div>
        <div className="input-wrapper">
          <i className="fas fa-lock icon"></i>

          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            onChange={handleInputChange(setPassword)}
            className="password-input"
          />
          <i
            className={`fas ${
              showPassword ? 'fa-eye-slash' : 'fa-eye'
            } toggle-password`}
            onClick={togglePasswordVisibility}></i>
        </div>
        <p>{error && <p>{error}</p>}</p>

        <Button
          onClick={handleLogin}
          name={'Login'}
          className="button-login"
        />
      </div>
    </div>
  );
};

export default Login;
