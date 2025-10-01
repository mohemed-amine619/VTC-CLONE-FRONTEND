import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import UserPage from "../pages/admin/users/UserPage.vue";
import LoginPage from "../pages/auth/LoginPage.vue";
import SingUpPage from "../pages/auth/SingUpPage.vue";
import VehiculePage from "../pages/admin/Vehicule/VehiculePage.vue";
import { isAdmin } from "../middleware/isAdmin";
import ProfilePage from "../pages/admin/users/ProfilePage.vue";
import WelcomPage from "../pages/admin/welcom/WelcomPage.vue";
import CustomerMapPage from "../pages/admin/map/CustomerMapPage.vue";
import DriverMapPage from "../pages/admin/map/DriverMapPage.vue";



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
        path: '/',
        name: 'dashboard',
        component: DashboardPage,
        children: [
            {
                path: "/users",
                component: UserPage,
                beforeEnter: isAdmin
            },
            {
                path: "/vehicules",
                component: VehiculePage
            },
            {
                path: "/welcom",
                component: () => WelcomPage
            },
            {
                path: "/profile",
                component : () => ProfilePage
            },
            {
                path: "/customer_map",
                component: () => CustomerMapPage
            },
            {
                path: "/driver_map",
                component: () => DriverMapPage
            }
        ]
    }
]

export const router = createRouter({
    //history: createMemoryHistory('/app'),
    history: createWebHistory('/app'),
    routes
})