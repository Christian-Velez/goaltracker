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

            const newStatusList = dataInStore.getProject?.statusList.filter(
               (status) => status.id !== id
            )

            store.writeQuery({
               query: GET_PROJECT,
               data: {
                  ...dataInStore,
                  getProject: {
                     ...dataInStore.getProject,
                     daysAchieved: newCount,
                     statusList: newStatusList,
                  },
               },
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
