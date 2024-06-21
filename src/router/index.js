import {createRouter, createWebHistory} from "vue-router";
import  useAuthAdminStore  from '../stores/admin/AuthAdminStore.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/admin/HomeAdminView.vue'),
            children:[
                {
                    path:"/category",
                    component:()=>import('../views/admin/AdminCategoryView/CategoryAdminView.vue')
                },
                {
                    path:"/add/category",
                    component:()=>import('../views/admin/AdminCategoryView/AddCategoryAdminView.vue')
                },
                {
                    path:"/car",
                    component:()=>import('../views/admin/AdminCarsView/CarAdminView.vue')
                },
                {
                    path:"/add/car",
                    component:()=>import('../views/admin/AdminCarsView/AddCarAdminView.vue')
                },
                {
                    path:"/user_information",
                    component:()=>import('../views/admin/AdminUserView/AdminInformationView.vue')
                },
                {
                    path:"/add/user_information",
                    component:()=>import('../views/admin/AdminUserView/AddAdminInformationView.vue')
                },
                {
                    path:"/admin_borrow",
                    component:()=>import('../views/admin/AdminBorrowView/AdminBorrowView.vue')
                },
            ]
        },
        {
            path: "/login",
            component: () => import('../views/admin/LoginAdminView.vue')
        },
        {
            path: "/register",
            component: () => import('../views/admin/RegisterAdminView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthAdminStore();
    const isAuthenticated = authStore.isAuthenticated();

    if (to.path === '/login' || to.path === '/register') {
        // 如果用户已经登录，访问登录或注册页面时重定向到首页
        if (isAuthenticated) {
            next('/');
        } else {
            next();
        }
    } else {
        // 其他受保护页面需要认证
        if (isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    }
})

export default router