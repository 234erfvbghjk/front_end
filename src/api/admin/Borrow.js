import {get,put,del} from "../../utils/request";

export const fetchBorrow =  () => {
    return get('/admin/borrow ');
};

export const putBorrow  = (id, params) => {
    return put(`/admin/borrow/${id}`, params);
};

export const delBorrow = (id) => {
    return del(`/admin/borrow/${id}`);
};
