import React from 'react'
import { useRoutes } from 'react-router-dom'

type Route = {
   path: string
   element: React.ReactNode
}

export const AppRoutes = () => {
   const commonRoutes: Route[] = [
      { path: '/', element: <h1>App</h1> },
      { path: '/test', element: <h1>Test</h1> },
   ]

   const privateRoutes: Route[] = []
   const publicRoutes: Route[] = []

   const isAuthenticated = true
   const routes = isAuthenticated ? privateRoutes : publicRoutes

   const element = useRoutes([...routes, ...commonRoutes])

   return <>{element}</>
}
