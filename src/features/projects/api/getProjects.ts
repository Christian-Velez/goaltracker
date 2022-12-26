import { Project, ProjectTypeDef } from '../types'
import { gql, useQuery } from '@apollo/client'

export const GET_PROJECTS = gql`
   query {
      getProjects {
         ${ProjectTypeDef}
      }
   }
`

type GetProjectsQuery = {
   getProjects: [Project]
}

export const useProjects = () => {
   const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS)

   return {
      projects: data?.getProjects,
      loading,
      error,
   }
}
