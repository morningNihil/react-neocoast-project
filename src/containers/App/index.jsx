import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ROUTES } from 'Data/constants';
import { AuthProvider } from '../../contexts/AuthContext.js';
import Home from 'Containers/Home';
import Login from 'Containers/Login';
import Profile from 'Containers/Profile';
import Layout from 'Components/Layout';
import ProductView from 'Containers/ProductView';
import CartView from 'Containers/CartView';
import GiftView from 'Containers/GiftView';

import './styles.scss';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.product} element={<ProductView />} />
          <Route path={ROUTES.gift} element={<GiftView />} />
          <Route path={ROUTES.cartGift} element={<CartView />} />
          <Route path={ROUTES.cart} element={<CartView />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path={ROUTES.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
