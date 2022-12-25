import Main from '../Landing'
import { Register } from '@/features/auth'
import { Navigate } from 'react-router-dom'

export const publicRoutes = [
   {
      path: '',
      element: <Main />,
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
