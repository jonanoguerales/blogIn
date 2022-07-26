import React, { createContext, useContext } from 'react'
import { Context } from '../context/Context'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {
  // const [user] = useState(null);
  const { user } = useContext(Context)

  const isLogged = () => !!user // Si esta logeado me retorna true con la doble exclamacion
  const hasRole = (role) => user?.role === role

  const contextValue = {
    user,
    isLogged,
    hasRole
  }
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
