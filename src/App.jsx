import { useState } from 'react'
import { userCommonRoutes, userProtectedRoutes } from './routes'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProtected from './protected/AuthProtected';


function App() {

  return (
    <>
      <Routes>
        {
          userCommonRoutes.map((userRoute, idx) => <Route key={idx} path={userRoute.path} element={<userRoute.element />} />)
        }
        <Route element={<AuthProtected />}>
          {
            userProtectedRoutes.map((userRoute, idx) => <Route key={idx} path={userRoute.path} element={<userRoute.element />} />)
          }
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
