import { Loading } from '@/components/Loading'
import { useProjects } from '@/features/projects/api/getProjects'
import { RawProject } from '@/features/projects/types'
import {
   Badge,
   HStack,
   IconButton,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react'
import { AiFillEdit } from 'react-icons/ai'
import { useProjectsContext } from '../store'

const ProjectItem = ({ project }: { project: RawProject }) => {
   const { openEditModal } = useProjectsContext()

   return (
      <HStack
         w='full'
         borderWidth='1px'
         borderStyle='solid'
         borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
         borderRadius='sm'
         padding={10}
         justify='space-between'
         textAlign='start'
      >
         <VStack alignItems='flex-start'>
            <Text fontWeight='bold'>{project.title}</Text>
            <Badge
               colorScheme={project.color}
               display={{ base: 'none', md: 'inline-block' }}
            >
               {project.daysAchieved}{' '}
               {project.daysAchieved === 1 ? 'day' : 'days'} achieved
            </Badge>
         </VStack>

         <IconButton
            aria-label='Edit'
            icon={<AiFillEdit />}
            variant={useColorModeValue('ghost', 'solid')}
            colorScheme={useColorModeValue('twitter', 'gray')}
            onClick={() => openEditModal(project)}
         />
      </HStack>
   )
}

export const ProjectsList = () => {
   const { projects, loading } = useProjects()

   if (loading) return <Loading text='Loading projects' />

   if (!projects?.length) return <Text>No projects</Text>

   return (
      <VStack w='full' spacing={5}>
         {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
         ))}
      </VStack>
   )
}
