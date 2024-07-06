import React from 'react'
import Logout from './logout'
import AdminHome from './adminHome'
import UserHome from './userHome'
import { useAuthContext } from '../contexts/authContext'

function Home() {
    const { user } = useAuthContext()
  return (
    <>
    {
        user.role == 'admin'
        ?
        <AdminHome />
        :
        <UserHome />
    }
    <Logout />
    </>
    
  )
}

export default Home