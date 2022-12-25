import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

type AppProviderProps = {
   children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
   return (
      <React.Suspense
         fallback={
            <div>
               <h1>Loading...</h1>
            </div>
         }
      >
         <Router>{children}</Router>
      </React.Suspense>
   )
}
