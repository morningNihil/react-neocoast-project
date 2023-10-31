import instance from './config';

export const getAllCarts = () => instance.get('/carts');

export const getCartById = (id) => instance.get(`/carts/${id}`);
