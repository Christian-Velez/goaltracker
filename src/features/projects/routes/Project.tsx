import { Calendar } from '@/components/Calendar'
import { dateToString } from '@/components/Calendar/utils'
import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { formatStatusList } from '@/features/projects/utils'
import { Container, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const Project = () => {
   const { projectId } = useParams()
   const { project, loading } = useProject({ projectId })
   const statusList = useMemo(
      () => formatStatusList(project?.statusList),
      [project]
   )

   function isDayAchieved(date: Date) {
      return statusList.includes(dateToString(date))
   }

   function onDayClick(date: Date) {}

   if (loading || !project) {
      return (
         <Container maxW='container.md' pt={40}>
            <Loading text='Loading project...' />
         </Container>
      )
   }

   return (
      <Container maxW='container.md'>
         <VStack py={10} spacing={{ base: 5, md: 10 }} w='full'>
            <ProjectHeader>{project.title}</ProjectHeader>

            <DaysAchievedLabel
               daysAchieved={project!.daysAchieved}
               color={project!.color}
            />

            <Calendar
               colorScheme={project.color}
               isDayMarked={isDayAchieved}
               onDayClick={onDayClick}
            />
         </VStack>
      </Container>
   )
}
