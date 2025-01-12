import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock API calls - replace these with actual API calls
const mockApi = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate validation
    if (email === 'test@example.com' && password === 'password123') {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      }
      return user
    }
    throw new Error('Invalid credentials')
  },
  
  register: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate existing user check
    if (email === 'test@example.com') {
      throw new Error('User already exists')
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email,
      createdAt: new Date(),
    }
  },
  
  forgotPassword: async (email: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Simulate sending reset email
    if (!email.includes('@')) {
      throw new Error('Invalid email')
    }
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored auth token and user data
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const user = await mockApi.login(email, password)
      
      // Store auth data
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', 'mock-jwt-token') // Replace with actual JWT
      
      setUser(user)
      
      // Navigate to the dashboard or previous attempted page
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const user = await mockApi.register(email, password)
      
      // In a real app, you might want to either:
      // 1. Automatically log the user in after registration
      // 2. Send them to the login page
      // For this example, we'll send them to login
      navigate('/auth/login')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear stored auth data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    setUser(null)
    navigate('/auth/login')
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      await mockApi.forgotPassword(email)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext 