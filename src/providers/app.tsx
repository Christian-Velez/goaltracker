import React from 'react'
import theme from '@/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/graphql'
import { NotificationContainer } from '@/lib/notifications'
import { Auth } from '@/lib/auth'

type AppProviderProps = {
   children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
   return (
      <ChakraProvider theme={theme}>
         <React.Suspense fallback={null}>
            <ApolloProvider client={client}>
               <Router>
                  <Auth>{children}</Auth>
               </Router>
               <NotificationContainer />
            </ApolloProvider>
         </React.Suspense>
      </ChakraProvider>
   )
}
