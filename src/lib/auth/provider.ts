import { UserResponse } from '@/features/auth/types'
import { User } from '@/features/user'
import { createContext } from 'react'

export type AuthContextType = {
   isAuthenticated: boolean
   user: User
   login: (response: UserResponse) => void
   logout: () => void
   updateUser: (data: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
