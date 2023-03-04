import { Status } from '../types'
import { gql, useMutation } from '@apollo/client'
import {
   GetProjectQuery,
   GET_PROJECT,
} from '@/features/projects/api/getProject'
import { useParams } from 'react-router-dom'
import { addStatusToStore } from '@/features/status/api/createStatus'
import { deleteStatusFromStore } from '@/features/status/api/deleteStatus'

const UPDATE_STATUS = gql`
   mutation updateStatus($projectId: ID!, $date: String!, $marked: Boolean) {
      updateStatus(projectId: $projectId, date: $date, marked: $marked) {
         status {
            id
            date
            value
         }

         newCount
         action
      }
   }
`

type Action = 'created' | 'deleted'
type UpdateStatusMutation = {
   updateStatus: {
      status: Status | null
      newCount: number
      action: Action
   }
}

export const useUpdateStatus = () => {
   const { projectId } = useParams()
   const [update, { loading, error }] = useMutation<UpdateStatusMutation>(
      UPDATE_STATUS,
      {
         update: (store, response) => {
            const dataInStore: Partial<GetProjectQuery> = store.readQuery({
               query: GET_PROJECT,
               variables: {
                  id: projectId,
               },
            }) as object

            const { action, status, newCount } =
               response.data?.updateStatus || {}

            if (!status || !newCount) return

            const data =
               action === 'created'
                  ? addStatusToStore(dataInStore, newCount, status)
                  : deleteStatusFromStore(dataInStore, newCount, status.id)

            store.writeQuery({
               query: GET_PROJECT,
               data,
            })
         },
      }
   )

   return {
      update,
      loading,
      error,
   }
}
