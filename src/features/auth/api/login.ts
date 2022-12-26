import { gql, useMutation } from '@apollo/client'
import { UserTypeDef } from '@/features/user'
import { addNotification } from '@/lib/notifications'
import { useAuth } from '@/lib/auth'
import { UserResponse } from '@/features/auth/types'

const LOGIN = gql`
   mutation login(
      $email: String!
      $password: String!
   ) {
      login(
         email: $email
         password: $password
      ) {
         user {
            ${UserTypeDef}
         }
         token         
      }
   }
`

type LoginMutation = {
   login: UserResponse
}

export const useLogin = () => {
   const { login: storeLogin } = useAuth()

   const [login, { loading, error }] = useMutation<LoginMutation>(LOGIN, {
      onCompleted: (data) => {
         addNotification({
            status: 'success',
            title: 'Login Successfully',
         })

         storeLogin(data.login)
      },
   })

   return {
      login,
      loading,
      error,
   }
}
