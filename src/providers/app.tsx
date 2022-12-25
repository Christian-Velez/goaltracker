import React from 'react'
import theme from '@/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Fallback } from '@/components/Fallback'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/graphql'

type AppProviderProps = {
   children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
   return (
      <ChakraProvider theme={theme}>
         <React.Suspense fallback={<Fallback />}>
            <ApolloProvider client={client}>
               <Router>{children}</Router>
            </ApolloProvider>
         </React.Suspense>
      </ChakraProvider>
   )
}
