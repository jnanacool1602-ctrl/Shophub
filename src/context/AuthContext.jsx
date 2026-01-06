import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Demo credentials - In production, this would be handled by backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (username, password) => {
    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = {
        username: username,
        role: 'admin'
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } else {
      return { success: false, error: 'Invalid username or password' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const isAdmin = () => {
    return isAuthenticated && user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
