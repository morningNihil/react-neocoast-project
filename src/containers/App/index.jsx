import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext.js';

import { ROUTES } from 'Data/constants';

import Home from 'Containers/Home';
import Login from 'Containers/Login';
import Profile from 'Containers/Profile';
import Layout from 'Components/Layout';
import ProductView from 'Containers/ProductView';

import './index.scss';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.product} element={<ProductView />} />
        </Route>
        <Route path={ROUTES.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
