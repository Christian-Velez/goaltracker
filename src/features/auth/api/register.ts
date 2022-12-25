import { gql, useMutation } from '@apollo/client'
import { UserTypeDef } from '@/features/user'
import { addNotification } from '@/lib/notifications'
import { useAuth } from '@/lib/auth'
import { UserResponse } from '@/features/auth/types'

const CREATE_USER = gql`
   mutation createUser(
      $name: String!
      $email: String!
      $password: String!
   ) {
      createUser(
         name: $name
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

type RegisterMutation = {
   createUser: UserResponse
}

export const useRegister = () => {
   const { login } = useAuth()

   const [register, { loading, error }] = useMutation<RegisterMutation>(
      CREATE_USER,
      {
         onCompleted: (data) => {
            addNotification({
               status: 'success',
               title: 'Registered Successfully',
            })

            login(data.createUser)
         },
      }
   )

   return {
      register,
      loading,
      error,
   }
}
