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
      <div className='max-w-[1400px] mx-auto mt-20'>
        <h1 className='font-[900] text-[23px]'>Stores</h1>
      </div>
    </>
  )
}
