import { Project, ProjectTypeDef } from '../types'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import { GET_PROJECTS } from './getProjects'
import { useState } from 'react'

const CREATE_PROJECT = gql`
   mutation createProject(
      $title: String!
      $color: String!
   ) {
      createProject(
         title: $title
         color: $color
      ) {
         ${ProjectTypeDef}
      }
   }
`

type CreateProjectMutation = {
   createProject: Project
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
