import {get,put,del} from "../../utils/request";

export const fetchUser =  () => {
    return get('/admin/auth');
};

export const putUser = (id, params) => {
    return put(`/admin/auth/${id}`, params);
};

export const delUser = (id) => {
    return del(`/admin/auth/${id}`);
};



