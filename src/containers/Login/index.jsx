import './styles.scss';
import { useAuth } from '../../contexts/AuthContext.js';
import loginUser from '../../api/userLogin.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'Components/Button';
import { ROUTES } from 'Data/constants';

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password !== '') {
      try {
        const response = await loginUser({ username, password });
        if (response.token) {
          login(username, response.token);
          console.log('Login successful');
          navigate(ROUTES.home);
        }
      } catch (error) {
        setError('Username or password incorrect');
      }
    } else {
      setError('You must enter a username and password');
    }
  };

  const handleInputChange = (inputSetter) => (e) => {
    error ? setError(null) : null;
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
        <div className="error-container">{<p>{error}</p>}</div>
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
