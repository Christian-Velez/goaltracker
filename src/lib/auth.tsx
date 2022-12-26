import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react'
import storage from '@/utils/storage'
import { User } from '@/features/user'
import { UserResponse } from '@/features/auth/types'
import { useGetUser } from '@/features/auth/api/getUser'
import { LoadingScreen } from '@/components/Loading'

type AuthContextType = {
   isAuthenticated: boolean
   user: User | null
   login: (response: UserResponse) => void
   logout: () => void
}

type AuthProviderProps = {
   children: React.ReactNode
}

const useAuthProvider = () => {
   const { getUser } = useGetUser()
   const [isLoading, setIsLoading] = useState(true)
   const [user, setUser] = useState<User | null>(null)
   const isAuthenticated = Boolean(user)

   const checkAuth = useCallback(() => {
      const token = storage.getToken()

      if (!token) {
         setUser(null)
         setIsLoading(false)
         return
      }

      getUser()
         .then((r) => {
            setUser(r.data?.me || null)
            setIsLoading(false)
         })
         .catch(() => {
            setUser(null)
            setIsLoading(false)
         })
   }, [getUser])

   useEffect(() => {
      checkAuth()
   }, [checkAuth])

   function login(response: UserResponse) {
      storage.setToken(response.token)
      setUser(response.user)
   }

   function logout() {
      storage.clearToken()
      setUser(null)
   }

   return {
      isLoading,
      isAuthenticated,
      user,
      login,
      logout,
   }
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
   return useContext(AuthContext) as AuthContextType
}

export const Auth = ({ children }: AuthProviderProps) => {
   const { isLoading, ...auth } = useAuthProvider()

   if (isLoading) return <LoadingScreen />

   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
