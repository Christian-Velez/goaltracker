import { Calendar } from '@/components/Calendar'
import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { Heading, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export const Project = () => {
   const { projectId } = useParams()
   const { project, loading } = useProject({ projectId })

   if (loading || !project) {
      return <Loading text='Loading project...' />
   }

   return (
      <VStack pt={10} spacing={5}>
         <Heading
            fontSize={{
               base: 'xl',
               md: '3xl',
            }}
            maxW='80%'
         >
            {project?.title}
         </Heading>

         <DaysAchievedLabel
            daysAchieved={project!.daysAchieved}
            color={project!.color}
         />

         <Calendar colorScheme={project.color} />
      </VStack>
   )
}
