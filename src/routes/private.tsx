import { Layout } from '@/components/Layout'
import { Projects } from '@/features/projects'
import { Navigate, Outlet } from 'react-router-dom'

const App = () => {
   return (
      <Layout>
         <Outlet />
      </Layout>
   )
}

export const privateRoutes = [
   {
      path: '/app/',
      element: <App />,
      children: [
         {
            path: '',
            element: <Projects />,
         }
      ],
   },
   {
      path: '*',
      element: <Navigate to='/app' />,
   },
]
