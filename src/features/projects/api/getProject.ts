import { ProjectTypeDef, Project } from '../types'
import { gql, useQuery } from '@apollo/client'

export const GET_PROJECTS = gql`
   query getProject($id: ID!){
      getProject(
         id: $id
      ) {
         ${ProjectTypeDef}
      }
   }
`

type GetProjectsQuery = {
   getProject: Project
}

type UseProjectProps = {
   projectId?: string
}

export const useProject = ({ projectId }: UseProjectProps) => {
   const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS, {
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
