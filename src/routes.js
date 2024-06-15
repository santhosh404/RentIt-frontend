import AdminSignin from "./pages/admins/auth/AdminSignin"
import AdminSignup from "./pages/admins/auth/AdminSignup"
import AdminHomePage from "./pages/admins/home/AdminHomePage"
import ViewOwnerRequest from "./pages/admins/home/ViewOwnerRequest"
import ViewOwnerRequestDetail from "./pages/admins/home/ViewOwnerRequestDetail"
import UserSignin from "./pages/users/auth/UserSignin"
import UserSignup from "./pages/users/auth/UserSignup"
import InitiateOwnerRequest from "./pages/users/home/InitiateOwnerRequest"
import OwnerRequest from "./pages/users/home/OwnerRequest"
import UserHomePage from "./pages/users/home/UserHomePage"

export const userCommonRoutes = [
    {
        path: '/user/sign-up',
        element: UserSignup
    },
    {
        path: '/user/sign-in',
        element: UserSignin
    },
    // {
    //     path: '/user/forgot-password',
    //     element: UserForgotPassword
    // },
    // {
    //     path: '/user/reset-password',
    //     element: UserResetPassword
    // },

]

export const userProtectedRoutes = [
    {
        path: '/user/home',
        element: UserHomePage
    },
    {
        path: '/user/owner-request',
        element: OwnerRequest
    },
    {
        path: '/user/initiate-owner-request',
        element: InitiateOwnerRequest
    }
]

export const adminCommonRoutes = [
    {
        path: '/admin/sign-up',
        element: AdminSignup
    },
    {
        path: '/admin/sign-in',
        element: AdminSignin
    },

]

export const adminProtectedRoutes = [
    {
        path: '/admin/home',
        element: AdminHomePage
    },
    {
        path: '/admin/owner-request',
        element: ViewOwnerRequest
    },
    {
        path: '/admin/owner-request/:id',
        element: ViewOwnerRequestDetail
    }
]