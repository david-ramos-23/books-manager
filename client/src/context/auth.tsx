import {
  getLoggedInUser,
  login,
  logout,
  signUp as signUpRequest,
} from '@/services/auth'
import { SignInFormValuesType, SignUpFormValuesType } from '@/types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserType } from '../../../src/models/user'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/routes/types'

interface AuthContextInterface {
  user: UserType | undefined
  signUp: (user: SignUpFormValuesType) => void
  signIn: (user: SignInFormValuesType) => void
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
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  const signUp = async (user: SignUpFormValuesType) => {
    try {
      const savedUser = await signUpRequest(user)

      setUser(savedUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      // setErrors(error.response.data.message)
    }
  }

  const signIn = async (user: SignInFormValuesType) => {
    try {
      const currentUser = await login(user)
      setUser(currentUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      // setErrors(error.response.data.message)
    }
  }

  const signOut = async () => {
    try {
      await logout()
      setUser(undefined)
      setIsAuthenticated(false)
      navigate(ROUTES.SignIn)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getLoggedInUser()
        if (res === undefined) return setIsAuthenticated(false)
        setIsAuthenticated(true)
        setUser(res)
        setLoading(false)
        navigate(ROUTES.Books)
      } catch (error) {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }
    void checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
