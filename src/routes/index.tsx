import { publicRoutes } from '@/routes/public'
import { privateRoutes } from '@/routes/private'
import { useRoutes } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export const AppRoutes = () => {
   const { isAuthenticated } = useAuth()
   const routes = isAuthenticated ? privateRoutes : publicRoutes
   const element = useRoutes([...routes])

   return <>{element}</>
}
