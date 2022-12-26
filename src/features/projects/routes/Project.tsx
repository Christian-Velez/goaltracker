import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { useParams } from 'react-router-dom'

export const Project = () => {
   const { projectId } = useParams()
   const { project, loading } = useProject({ projectId })

   if (loading) {
      return <Loading text='Loading project...' />
   }

   return (
      <div style={{ textAlign: 'start' }}>
         <pre>{JSON.stringify(project, null, 4)}</pre>
      </div>
   )
}
