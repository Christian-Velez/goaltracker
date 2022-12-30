import { RawProject, RawProjectTypeDef } from '../types'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import { GET_PROJECTS } from './getProjects'
import { useState } from 'react'

const CREATE_PROJECT = gql`
   mutation createProject(
      $title: String!
      $description: String
      $color: String!
   ) {
      createProject(
         title: $title
         description: $description
         color: $color
      ) {
         ${RawProjectTypeDef}
      }
   }
`

type CreateProjectMutation = {
   createProject: RawProject
}

export const useCreateProject = () => {
   const [completed, setCompleted] = useState(false)
   const [create, { loading, error }] = useMutation<CreateProjectMutation>(
      CREATE_PROJECT,
      {
         refetchQueries: [
            {
               query: GET_PROJECTS,
            },
         ],
         onCompleted: () => setCompleted(true),
      }
   )

   async function createProject(
      data: MutationFunctionOptions<CreateProjectMutation>
   ) {
      setCompleted(false)
      return await create(data)
   }

   return {
      createProject,
      loading,
      error,
      completed,
   }
}
