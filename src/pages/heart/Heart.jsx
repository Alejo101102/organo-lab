import React from 'react'
import { Outlet, useLocation } from 'react-router'
import './Heart.css'

export const Heart = () => {
  const location = useLocation()
  const userData = location.state?.userData
  return (
    <div>
      <h1>Heart</h1>
      <>{userData?.displayName}</>
      <Outlet />
    </div>
  )
}

export default Heart