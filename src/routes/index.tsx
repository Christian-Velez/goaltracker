import React from 'react'
import { useRoutes } from 'react-router-dom'

type Route = {
   path: string
   element: React.ReactNode
}

const Main = React.lazy(() => {
   return new Promise((resolve) => {
      setTimeout(() => {
         import('../Landing').then((result) => resolve(result))
      }, 3000)
   })
})

export const AppRoutes = () => {
   const commonRoutes: Route[] = [
      { path: '/', element: <Main /> },
      { path: '/test', element: <h1>Test</h1> },
      { path: '*', element: <h1>Not found</h1> },
   ]

   const privateRoutes: Route[] = []
   const publicRoutes: Route[] = []

   const isAuthenticated = true
   const routes = isAuthenticated ? privateRoutes : publicRoutes

   const element = useRoutes([...routes, ...commonRoutes])

   return <>{element}</>
}
