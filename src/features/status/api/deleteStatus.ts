import {
   GetProjectQuery,
   GET_PROJECT,
} from '@/features/projects/api/getProject'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

const DELETE_STATUS = gql`
   mutation deleteStatus($id: ID!) {
      deleteStatus(id: $id) {
         id
         newCount
      }
   }
`

type DeleteStatusMutation = {
   deleteStatus: {
      id: string
      newCount: number
   }
}

export const deleteStatusFromStore = (
   store: Partial<GetProjectQuery>,
   newCount: number,
   id: string
) => {
   const newStatusList = store.getProject?.statusList.filter(
      (status) => status.id !== id
   )

   return {
      ...store,
      getProject: {
         ...store.getProject,
         daysAchieved: newCount,
         statusList: newStatusList,
      },
   }
}

export const useDeleteStatus = () => {
   const { projectId } = useParams()
   const [deleteStatus, { loading, error }] = useMutation<DeleteStatusMutation>(
      DELETE_STATUS,
      {
         update: (store, response) => {
            const dataInStore: Partial<GetProjectQuery> = store.readQuery({
               query: GET_PROJECT,
               variables: {
                  id: projectId,
               },
            }) as object

            const { id, newCount } = response.data?.deleteStatus || {}
            if (!id || !newCount) return

            store.writeQuery({
               query: GET_PROJECT,
               data: deleteStatusFromStore(dataInStore, newCount, id),
            })
         },
      }
   )

   return {
      deleteStatus,
      loading,
      error,
   }
}
