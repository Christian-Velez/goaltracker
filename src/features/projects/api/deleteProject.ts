import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import { GET_PROJECTS } from './getProjects'
import { useState } from 'react'

const DELETE_PROJECT = gql`
   mutation deleteProject($id: ID!) {
      deleteProject(id: $id)
   }
`

export const useDeleteProject = () => {
   const [completed, setCompleted] = useState(false)
   const [deleteP, { loading, error }] = useMutation(DELETE_PROJECT, {
      refetchQueries: [
         {
            query: GET_PROJECTS,
         },
      ],
      onCompleted: () => setCompleted(true),
   })

   async function deleteProject(data: MutationFunctionOptions) {
      setCompleted(false)
      return await deleteP(data)
   }

   return {
      deleteProject,
      loading,
      error,
      completed,
   }
}
