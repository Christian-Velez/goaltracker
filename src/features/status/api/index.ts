import { Status } from '../types'
import { gql, useMutation } from '@apollo/client'
import { GET_PROJECT } from '@/features/projects/api/getProject'
import { useParams } from 'react-router-dom'

const UPDATE_STATUS = gql`
   mutation updateStatus($projectId: ID!, $date: String!) {
      updateStatus(projectId: $projectId, date: $date) {
         id
         date
         value
      }
   }
`

type UpdateStatusMutation = {
   updateStatus: Status
}

export const useStatus = () => {
   const { projectId } = useParams()
   const [update, { loading, error }] = useMutation<UpdateStatusMutation>(
      UPDATE_STATUS,
      {
         refetchQueries: [
            {
               query: GET_PROJECT,
               variables: {
                  id: projectId,
               },
            },
         ],
      }
   )

   return {
      update,
      loading,
      error,
   }
}
