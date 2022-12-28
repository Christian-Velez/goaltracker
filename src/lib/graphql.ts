import { API_URL } from '@/config'
import { addNotification } from '@/lib/notifications'
import storage from '@/utils/storage'
import {
   ApolloClient,
   createHttpLink,
   InMemoryCache,
   from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
   uri: API_URL,
})

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
   if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
         addNotification({
            status: 'error',
            title: 'Error',
            description: message,
         })
      })
   }

   if (networkError) {
      addNotification({
         status: 'error',
         title: 'Network error',
         description: `${networkError}`,
      })
   }
})

const authLink = setContext((_, { headers }) => {
   const token = storage.getToken()

   if (!token) return headers

   return {
      headers: {
         ...headers,
         authorization: `Bearer ${token}`,
      },
   }
})

export const client = new ApolloClient({
   link: from([errorLink, authLink.concat(httpLink)]),
   cache: new InMemoryCache(),
   connectToDevTools: true,
})
