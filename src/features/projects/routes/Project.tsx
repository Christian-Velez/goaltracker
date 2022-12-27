import { Calendar } from '@/components/Calendar'
import { dateToString } from '@/components/Calendar/utils'
import { Loading } from '@/components/Loading'
import { useProject } from '@/features/projects/api/getProject'
import { DaysAchievedLabel } from '@/features/projects/components/ProjectItem'
import { formatStatusList } from '@/features/projects/utils'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
   Box,
   Container,
   Heading,
   HStack,
   IconButton,
   VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Project = () => {
   const navigate = useNavigate()
   const { projectId } = useParams()
   const { project, loading } = useProject({ projectId })
   const statusList = useMemo(
      () => formatStatusList(project?.statusList),
      [project]
   )

   const isDayAchieved = (date: Date) => {
      return statusList.includes(dateToString(date))
   }

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
            <HStack w='full' justifyContent='space-between' textAlign='center'>
               <Box flex={1}>
                  <IconButton
                     aria-label='Home'
                     icon={<ArrowBackIcon />}
                     onClick={() => navigate('/')}
                     variant='ghost'
                  />
               </Box>

               <Heading
                  fontSize={{
                     base: 'xl',
                     md: '3xl',
                  }}
               >
                  {project?.title}
               </Heading>

               <Box flex={1} />
            </HStack>

            <DaysAchievedLabel
               daysAchieved={project!.daysAchieved}
               color={project!.color}
            />

            <Calendar
               colorScheme={project.color}
               isDayMarked={isDayAchieved}
               //onDayClick={(date) => alert(date.getTime())}
            />
         </VStack>
      </Container>
   )
}
