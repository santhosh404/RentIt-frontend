import React, { useContext, useEffect } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { UserContext } from '../../../contexts/users/UserContext'

export default function UserHomePage() {

  const { getUserById } = useContext(UserContext)

  useEffect(() => {
    getUserById()
  }, [])
  return (
    <>
    <CustomNavbar />
      <h1>User Home Page</h1>
    </>
  )
}
