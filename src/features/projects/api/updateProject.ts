import { RawProject, RawProjectTypeDef } from '../types'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import { GET_PROJECTS } from './getProjects'
import { useState } from 'react'

const UPDATE_PROJECT = gql`
   mutation updateProject(
      $id: ID!
      $title: String!
      $color: String!
   ) {
      updateProject(
         id: $id
         title: $title
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
         refetchQueries: [
            {
               query: GET_PROJECTS,
            },
         ],
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
