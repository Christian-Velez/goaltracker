import { RawProject, RawProjectTypeDef } from '../types'
import { gql, useQuery } from '@apollo/client'

export const GET_PROJECTS = gql`
   query {
      getProjects {
         ${RawProjectTypeDef}
      }
   }
`

type GetProjectsQuery = {
   getProjects: [RawProject]
}

export const useProjects = () => {
   const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS)

   return {
      projects: data?.getProjects,
      loading,
      error,
   }
}
