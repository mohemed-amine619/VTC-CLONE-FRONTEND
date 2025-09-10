import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import UserPage from "../pages/admin/users/UserPage.vue";
import LoginPage from "../pages/auth/LoginPage.vue";
import SingUpPage from "../pages/auth/SingUpPage.vue";



const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SingUpPage,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardPage,
        children: [
            {
                path: "/users",
                component: UserPage
            }
        ]
    }
]

export const router = createRouter({
     //history: createMemoryHistory('/app'),
    history: createWebHistory('/app'),
    routes
})