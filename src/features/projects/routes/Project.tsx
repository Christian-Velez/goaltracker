import { Calendar } from '@/components/Calendar'
import { dateToString } from '@/components/Calendar/utils'
import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { formatStatusList } from '@/features/projects/utils'
import { useUpdateStatus } from '@/features/status/api/updateStatus'
import { useDebounce } from '@/hooks/useDebounce'
import { Container, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const Project = () => {
   const { projectId } = useParams()
   const { project, loading, error } = useProject({ projectId })
   const updateStatusMutation = useUpdateStatus()

   const descColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')

   const statusList = useMemo(
      () => formatStatusList(project?.statusList),
      [project]
   )

   function isDayAchieved(date: Date) {
      return statusList.includes(dateToString(date))
   }

   function onDayClick(date: Date, marked: boolean) {
      updateStatusMutation.update({
         variables: {
            projectId,
            date,
            marked,
         },
      })
   }

   const optimizedDayClick = useDebounce(onDayClick, 1000)

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
            <Text
               color={descColor}
               textAlign='justify'
               wordBreak='break-all'
               noOfLines={5}
            >
               {project.description}
            </Text>

            <DaysAchievedLabel
               daysAchieved={project!.daysAchieved}
               color={project!.color}
            />

            <Calendar
               colorScheme={project.color}
               onDayClick={optimizedDayClick}
               initialValues={{
                  isDayMarked: isDayAchieved,
               }}
            />
         </VStack>
      </Container>
   )
}
