import storage from '@/utils/storage'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserResponse } from '@/features/auth/types'
import { User } from '@/features/user'
import { useGetUser } from '@/features/auth/api/getUser'
import { useApolloClient } from '@apollo/client'
import { LoadingScreen } from '@/components/Loading'
import { AuthContext, AuthContextType } from './provider'

type AuthProviderProps = {
   children: React.ReactNode
}

const useAuthProvider = () => {
   const client = useApolloClient()
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
      client.clearStore()
   }

   function updateUser(data: Partial<User>) {
      setUser((v) => {
         if (!v) return v

         return {
            ...v,
            data,
         }
      })
   }

   return {
      isLoading,
      isAuthenticated,
      user,
      login,
      logout,
      updateUser,
   }
}

export const useAuth = () => {
   return useContext(AuthContext) ?? ({} as AuthContextType)
}

export const Auth = ({ children }: AuthProviderProps) => {
   const { isLoading, ...auth } = useAuthProvider()

   if (isLoading) return <LoadingScreen />

   return (
      <AuthContext.Provider
         value={{
            ...auth,
            user: auth.user as User,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}
