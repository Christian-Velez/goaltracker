import { User, UserTypeDef } from '@/features/user'
import { gql, useLazyQuery } from '@apollo/client'

const ME = gql`
   query {
      me {
         ${UserTypeDef}
      }
   }
`

type GetUserMutation = {
   me: User | null
}

export const useGetUser = () => {
   const [getUser, { loading, error }] = useLazyQuery<GetUserMutation>(ME)

   return {
      getUser,
      loading,
      error,
   }
}
