import { Calendar } from '@/components/Calendar'
import { dateToString } from '@/components/Calendar/utils'
import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { formatStatusList, getDateId } from '@/features/projects/utils'
import { useCreateStatus } from '@/features/status'
import { useDeleteStatus } from '@/features/status/api/deleteStatus'
import { Container, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const Project = () => {
   const { projectId } = useParams()
   const { project, loading, error } = useProject({ projectId })
   const createStatusMutation = useCreateStatus()
   const deleteStatusMutation = useDeleteStatus()

   const statusList = useMemo(
      () => formatStatusList(project?.statusList),
      [project]
   )

   function isDayAchieved(date: Date) {
      return statusList.includes(dateToString(date))
   }

   function onDayClick(date: Date) {
      if (!isDayAchieved(date)) {
         createStatusMutation.create({
            variables: {
               projectId,
               date,
            },
         })
         return
      }

      const id = getDateId(project!.statusList, date)
      deleteStatusMutation.deleteStatus({
         variables: {
            id,
         },
      })
   }

   if (loading) {
      return (
         <Container maxW='container.md' pt={40}>
            <Loading text='Loading project...' />
         </Container>
      )
   }

   if (error || !project) {
      return <Navigate to='/app' />
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
               onDayClick={onDayClick}
               initialValues={{
                  isDayMarked: isDayAchieved,
               }}
            />
         </VStack>
      </Container>
   )
}
