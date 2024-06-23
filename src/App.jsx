import { useState } from 'react'
import { adminCommonRoutes, adminProtectedRoutes, userCommonRoutes, userProtectedRoutes } from './routes'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProtected from './protected/AuthProtected';
import NotFound from './pages/NotFound';


function App() {

  return (
    <>
      <Routes>
        {
          userCommonRoutes.map((userRoute, idx) => <Route key={idx} path={userRoute.path} element={<userRoute.element />} />)
        }
        {
          adminCommonRoutes.map((adminRoute, idx) => <Route key={idx} path={adminRoute.path} element={<adminRoute.element />} />)
        }
        <Route element={<AuthProtected route={'/admin/sign-in'} />}>
          {
            adminProtectedRoutes.map((adminRoute, idx) => <Route key={idx} path={adminRoute.path} element={<adminRoute.element />} />)
          }
        </Route>
        <Route element={<AuthProtected route={'/user/sign-in'} />}>
          {
            userProtectedRoutes.map((userRoute, idx) => <Route key={idx} path={userRoute.path} element={<userRoute.element />} />)
          }
        </Route>
        <Route path='/' element={<Navigate to={'/user/home'} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
