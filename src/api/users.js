import instance from './config';

const getAllUsers = () => instance.get('/users');

export default getAllUsers;
