import {defineStore} from 'pinia'
import {reactive} from 'vue'

const UserStore = defineStore('UserStore', () => {
    const userinfo = reactive({
        username: "",
        id: "",
        token: ""
    })
    const save = ({id, username, token}) => {

        userinfo.token = token
    }
    return {
        userinfo, save
    }
}, {
    // 持续化存储
    persist: true
})

export default UserStore