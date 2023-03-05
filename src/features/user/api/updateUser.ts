import { useState } from 'react'
import { User, UserTypeDef } from '../types'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'

const UPDATE_USER = gql`
   mutation updateUser(
      $name: String!
      $changePassword: Boolean!
      $currentPassword: String
      $newPassword: String
   ) {
      updateUser(
         name: $name
         changePassword: $changePassword
         currentPassword: $currentPassword
         newPassword: $newPassword
      ) {
         ${UserTypeDef}
      }
   }
`

type UpdateUserMutation = {
   updateUser: User
}

export const useUpdateUser = () => {
   const [completed, setCompleted] = useState(false)
   const [update, { loading, error }] = useMutation<UpdateUserMutation>(
      UPDATE_USER,
      {
         onCompleted: () => setCompleted(true),
      }
   )

   async function updateUser(
      data: MutationFunctionOptions<UpdateUserMutation>
   ) {
      setCompleted(false)
      return await update(data)
   }

   return {
      update: updateUser,
      loading,
      error,
      completed,
   }
}
