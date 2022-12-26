import { Skeleton } from '@/components/Skeleton'
import { useProjects } from '@/features/projects/api/getProjects'
import { RawProject } from '@/features/projects/types'
import {
   Badge,
   Grid,
   GridItem,
   IconButton,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useProjectsModal } from '../store'

const ProjectItem = ({ project }: { project: RawProject }) => {
   const navigate = useNavigate()
   const { openModal } = useProjectsModal()

   function viewProject() {
      navigate(`/app/project/${project.id}`)
   }

   return (
      <Grid
         w='full'
         borderWidth='1px'
         borderStyle='solid'
         borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
         borderRadius='sm'
         padding={{
            base: 6,
            md: 10,
         }}
         templateColumns='auto min(93px)'
         gap={5}
         justifyContent='space-between'
         textAlign='start'
         onClick={viewProject}
      >
         <GridItem>
            <VStack alignItems='flex-start'>
               <Text
                  fontWeight='bold'
                  noOfLines={2}
                  maxW={{ base: '30vw', md: '50vw' }}
               >
                  {project.title}
               </Text>
               <Badge
                  colorScheme={project.color}
                  display={{ base: 'none', md: 'inline-block' }}
               >
                  {project.daysAchieved}{' '}
                  {project.daysAchieved === 1 ? 'day' : 'days'} achieved
               </Badge>
            </VStack>
         </GridItem>

         <GridItem>
            <IconButton
               aria-label='Edit'
               icon={<AiFillEdit />}
               variant={useColorModeValue('ghost', 'solid')}
               colorScheme={useColorModeValue('twitter', 'gray')}
               onClick={() => openModal('edit', project)}
            />

            <IconButton
               aria-label='Delete'
               icon={<AiFillDelete />}
               variant={useColorModeValue('ghost', 'solid')}
               colorScheme={useColorModeValue('red', 'gray')}
               onClick={() => openModal('delete', project)}
               ml={3}
            />
         </GridItem>
      </Grid>
   )
}

export const ProjectsList = () => {
   const { projects, loading } = useProjects()

   if (loading) return <Skeleton number={10} />

   if (!projects?.length) return <Text>No projects</Text>

   return (
      <Grid w='full' gap={5}>
         {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
         ))}
      </Grid>
   )
}
