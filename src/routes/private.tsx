import { Layout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const { Projects } = lazyImport(() => import('@/features/projects'), 'Projects')
const { Project } = lazyImport(() => import('@/features/projects'), 'Project')
const { Profile } = lazyImport(() => import('@/features/user'), 'Profile')

const App = () => {
   const { pathname } = useLocation()

   if (pathname.includes('project')) return <Outlet />

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
         {
            path: 'profile',
            element: <Profile />,
         },
      ],
   },
   {
      path: '*',
      element: <Navigate to='/app' />,
   },
]
