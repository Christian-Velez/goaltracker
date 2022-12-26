import { Register, Login } from '@/features/auth'
import { Landing } from '@/features/misc'
import { Navigate } from 'react-router-dom'

export const publicRoutes = [
   {
      path: '',
      element: <Landing />,
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '*',
      element: <Navigate to='/' />,
   },
]
