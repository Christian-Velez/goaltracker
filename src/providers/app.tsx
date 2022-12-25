import React from 'react'
import theme from '@/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Loading } from '@/components/Loading'
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
         <React.Suspense fallback={<Loading />}>
            <ApolloProvider client={client}>
               <Auth>
                  <Router>{children}</Router>
               </Auth>
               <NotificationContainer />
            </ApolloProvider>
         </React.Suspense>
      </ChakraProvider>
   )
}
