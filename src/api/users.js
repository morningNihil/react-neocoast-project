import instance from './config';

const getAllUsers = () => instance.get('/users');

console.log(instance.get('/users'));

export default getAllUsers;
