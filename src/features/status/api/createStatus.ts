import { Status } from '../types'
import { gql, useMutation } from '@apollo/client'
import {
   GetProjectQuery,
   GET_PROJECT,
} from '@/features/projects/api/getProject'
import { useParams } from 'react-router-dom'

const CREATE_STATUS = gql`
   mutation createStatus($projectId: ID!, $date: String!) {
      createStatus(projectId: $projectId, date: $date) {
         status {
            id
            date
            value
         }
         newCount
      }
   }
`

type CreateStatusMutation = {
   createStatus: {
      status: Status
      newCount: number
   }
}

export const addStatusToStore = (
   store: Partial<GetProjectQuery>,
   newCount: number,
   newStatus: Status
) => {
   return {
      ...store,
      getProject: {
         ...store.getProject,
         daysAchieved: newCount,
         statusList: [...(store.getProject?.statusList || []), newStatus],
      },
   }
}

export const useCreateStatus = () => {
   const { projectId } = useParams()
   const [create, { loading, error }] = useMutation<CreateStatusMutation>(
      CREATE_STATUS,
      {
         update: (store, response) => {
            const dataInStore: Partial<GetProjectQuery> = store.readQuery({
               query: GET_PROJECT,
               variables: {
                  id: projectId,
               },
            }) as object

            const { status, newCount } = response.data?.createStatus || {}

            if (!status || !newCount) return

            store.writeQuery({
               query: GET_PROJECT,
               data: addStatusToStore(dataInStore, newCount, status),
            })
         },
      }
   )

   return {
      create,
      loading,
      error,
   }
}
