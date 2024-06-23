import AdminSignin from "./pages/admins/auth/AdminSignin"
import AdminSignup from "./pages/admins/auth/AdminSignup"
import AdminHomePage from "./pages/admins/home/AdminHomePage"
import ViewOwnerRequest from "./pages/admins/home/ViewOwnerRequest"
import ViewOwnerRequestDetail from "./pages/admins/home/ViewOwnerRequestDetail"
import UserSignin from "./pages/users/auth/UserSignin"
import UserSignup from "./pages/users/auth/UserSignup"
import BookingLogs from "./pages/users/home/BookingLogs"
import InitiateOwnerRequest from "./pages/users/home/InitiateOwnerRequest"
import MyProfile from "./pages/users/home/MyProfile"
import MyStoreDetails from "./pages/users/home/MyStoreDetails"
import MyStores from "./pages/users/home/MyStores"
import OwnerRequest from "./pages/users/home/OwnerRequest"
import PaymentSuccess from "./pages/users/home/PaymentSuccess"
import PostProperty from "./pages/users/home/PostProperty"
import RentedStores from "./pages/users/home/RentedStores"
import StoreDetails from "./pages/users/home/StoreDetails"
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
    {
        path: '/user/home',
        element: UserHomePage
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
        path: '/user/rented-stores',
        element: RentedStores
    },
    {
        path: '/user/owner-request',
        element: OwnerRequest
    },
    {
        path: '/user/initiate-owner-request',
        element: InitiateOwnerRequest
    },
    {
        path: '/user/post-property',
        element: PostProperty
    },
    {
        path: '/user/my-stores',
        element: MyStores
    },
    {
        path: '/user/my-stores/:id',
        element: MyStoreDetails
    },
    {
        path: '/user/store/:id',
        element: StoreDetails
    },
    {
        path: '/user/my-profile',
        element: MyProfile
    },
    {
        path: '/user/booking-logs',
        element: BookingLogs
    },
    {
        path: "/user/payment/success/:id",
        element: PaymentSuccess
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