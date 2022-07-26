import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../auth/useAuth'

const PrivateRoute = ({ hasRole: role, children }) => {
  const { hasRole, isLogged } = useAuth()

  if (isLogged()) {
    if (role && !hasRole(role)) {
      return <Navigate to='*' />
    } return children
  } else { return <Navigate to='/login' /> }
}

export default PrivateRoute
