import instance from './config';

const getAllCategories = () => instance.get('/products/categories');

export default getAllCategories;
