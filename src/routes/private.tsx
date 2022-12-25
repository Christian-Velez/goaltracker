import { useAuth } from '@/lib/auth'
import { Button } from '@chakra-ui/react'
import { Navigate, Outlet } from 'react-router-dom'

const App = () => {
   const { user, logout } = useAuth()

   return (
      <div>
         <pre>{JSON.stringify(user, null, 4)}</pre>
         <Button onClick={logout}>Logout</Button>
         <Outlet />
      </div>
   )
}

export const privateRoutes = [
   {
      path: '/app/',
      element: <App />,
      children: [
         {
            path: '',
            element: <div>Bienvenido a la App</div>,
         },
      ],
   },
   {
      path: '*',
      element: <Navigate to='/app' />,
   },
]
