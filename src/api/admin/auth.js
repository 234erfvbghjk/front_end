import {post} from "../../utils/request";

export const login = (params) => {
    return post("/admin/auth/login", params)
};

// export const register = (params) => {
//     return post("/admin/auth/register", params)
// };