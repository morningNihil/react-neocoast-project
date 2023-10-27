import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext.js';

import { ROUTES } from 'Data/constants';

import Home from 'Containers/Home';
import Login from 'Containers/Login';

import Layout from 'Components/Layout';

import './index.scss';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path={ROUTES.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
