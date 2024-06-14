import UserSignin from "./pages/users/auth/UserSignin"
import UserSignup from "./pages/users/auth/UserSignup"
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
    }
]

// export const adminRoutes = [
//     {
//         path: '/admin/sign-up',
//         element: AdminSignUp
//     },
//     {
//         path: '/admin/sign-in',
//         element: AdminSignIn
//     },
//     {
//         path: '/admin/home',
//         element: AdminHomePage
//     }
// ]