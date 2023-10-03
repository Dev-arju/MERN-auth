import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAccess = () => {
  const { authData } = useSelector(state => state.admin)  

  return authData.length > 0 ? <Outlet /> : <Navigate to='/admin/login' replace />
}

export default AdminAccess