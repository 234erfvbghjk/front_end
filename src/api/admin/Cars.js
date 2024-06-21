// utils/request.js
import axios from 'axios';

export const fetchCar = async () => {
    return await axios.get('/admin/cars');
};

export const postCar = async ( ) => {
    return await axios.post('/admin/cars');
};

export const putCar = async (id, params) => {
    return await axios.put(`/admin/cars/${id}`, params);
};
//
export const delCar = async (id) => {
    return await axios.delete(`/admin/cars/${id}`);
};