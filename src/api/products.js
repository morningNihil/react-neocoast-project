import instance from './config';

const getAllProducts = () => instance.get('/products');

export default getAllProducts;
