import { RawProject, RawProjectTypeDef } from '../types'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import { useState } from 'react'

const UPDATE_PROJECT = gql`
   mutation updateProject(
      $id: ID!
      $title: String!
      $description: String
      $color: String!
   ) {
      updateProject(
         id: $id
         title: $title
         description: $description
         color: $color
      ) {
         ${RawProjectTypeDef}
      }
   }
`

type UpdateProjectMutation = {
   updateProject: RawProject
}

export const useUpdateProject = () => {
   const [completed, setCompleted] = useState(false)
   const [update, { loading, error }] = useMutation<UpdateProjectMutation>(
      UPDATE_PROJECT,
      {
         onCompleted: () => setCompleted(true),
      }
   )

   async function updateProject(
      data: MutationFunctionOptions<UpdateProjectMutation>
   ) {
      setCompleted(false)
      return await update(data)
   }

   return {
      updateProject,
      loading,
      error,
      completed,
   }
}
