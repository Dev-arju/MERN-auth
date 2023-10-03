import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
    const { authData } = useSelector(state => state.user)

  return authData.length > 0 ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute