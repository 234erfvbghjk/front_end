import {defineStore} from "pinia";
import {ref} from "vue";
import {useStorage} from '@vueuse/core'

const useAuthAdminStore = defineStore(
    "AuthAdminStore",
    () => {
        const userinfo = ref({
            token: useStorage("token", "")
        });

        const saveToken = ({token}) => {
            userinfo.value.token = token;
            return Boolean(userinfo.value.token);
        };

        const isAuthenticated = () => {
            return Boolean(userinfo.value.token);
        };

        return {
            userinfo,
            saveToken,
            isAuthenticated,
        };
    },
    {
        persist: true,
    }
);

export default useAuthAdminStore;