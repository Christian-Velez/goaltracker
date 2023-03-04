import { Calendar } from '@/components/Calendar'
import { Container, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { dateToString } from '@/components/Calendar/utils'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { formatStatusList } from '@/features/projects/utils'
import { Loading } from '@/components/Loading'
import { Navigate, useParams } from 'react-router-dom'
import { ProjectHeader } from '@/features/projects/components/ProjectHeader'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useProject } from '@/features/projects/api/getProject'
import { useUpdateStatus } from '@/features/status/api/updateStatus'

function useDaysAchieved(
   projectD: number | undefined
): [number, React.Dispatch<React.SetStateAction<number>>] {
   const firstSet = useRef(false)
   const [daysAchieved, setDaysAchieved] = useState(0)

   useEffect(() => {
      if (projectD !== undefined && !firstSet.current) {
         setDaysAchieved(projectD)
         firstSet.current = true
      }
   }, [projectD])

   return [daysAchieved, setDaysAchieved]
}

export const Project = () => {
   const updateStatusMutation = useUpdateStatus()
   const descColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
   const { projectId } = useParams()
   const { project, loading, error } = useProject({ projectId })
   const [daysAchieved, setDaysAchieved] = useDaysAchieved(
      project?.daysAchieved
   )

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
               daysAchieved={daysAchieved}
               color={project.color}
            />

            <Calendar
               colorScheme={project.color}
               onDayClick={onDayClick}
               setDaysAchieved={setDaysAchieved}
               initialValues={{
                  isDayMarked: isDayAchieved,
               }}
            />
         </VStack>
      </Container>
   )
}
