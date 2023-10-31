import instance from './config';

export const getAllProducts = () => instance.get('/products');

export const getProductById = (id) => instance.get(`/products/${id}`);
