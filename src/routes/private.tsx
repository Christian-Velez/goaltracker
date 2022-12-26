import { Layout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'
import { Navigate, Outlet } from 'react-router-dom'

const { Projects } = lazyImport(() => import('@/features/projects'), 'Projects')
const { Project } = lazyImport(() => import('@/features/projects'), 'Project')

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
         },
         {
            path: 'project/:projectId',
            element: <Project />,
         },
      ],
   },
   {
      path: '*',
      element: <Navigate to='/app' />,
   },
]
