import { ProjectTypeDef, Project } from '../types'
import { gql, useQuery } from '@apollo/client'

export const GET_PROJECT = gql`
   query getProject($id: ID!){
      getProject(
         id: $id
      ) {
         ${ProjectTypeDef}
      }
   }
`

type GetProjectQuery = {
   getProject: Project
}

type UseProjectProps = {
   projectId?: string
}

export const useProject = ({ projectId }: UseProjectProps) => {
   const { data, loading, error } = useQuery<GetProjectQuery>(GET_PROJECT, {
      variables: {
         id: projectId,
      },
   })

   return {
      project: data?.getProject,
      loading,
      error,
   }
}
