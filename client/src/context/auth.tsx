import {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react'
import { UserType } from '../../../src/models/user'
import { login, logout, signUp as signUpRequest } from '@/services/auth'
import { SignInFormValues } from '@/types'

interface AuthContextInterface {
  user: UserType | undefined
  signUp: (user: UserType) => void
  signIn: (user: SignInFormValues) => void
  signOut: () => void
  isAuthenticated: boolean
  errors: string[]
  loading: boolean
}
const AuthContext = createContext<AuthContextInterface | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null)
    throw new Error(
      'AuthContext not found. Must be used within an AuthProvider'
    )
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  console.log('isAuthenticated: ', isAuthenticated)
  const [errors, setErrors] = useState([])
  const [loading] = useState(true)

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  const signUp = async (user: UserType) => {
    try {
      const savedUser = await signUpRequest(user)

      setUser(savedUser)
      console.log('savedUser: ', savedUser)
      setIsAuthenticated(true)
      console.log('setIsAuthenticated')
    } catch (error) {
      console.log(error)
      // setErrors(error.response.data.message)
    }
  }

  const signIn = async (user: SignInFormValues) => {
    console.log('user: ', user)
    try {
      const currentUser = await login(user)
      console.log('currentUser: ', currentUser)
      setUser(currentUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.log(error)
      // setErrors(error.response.data.message)
    }
  }

  const signOut = async () => {
    try {
      await logout()
      setUser(undefined)
      setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
      // setErrors(error.response.data.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
