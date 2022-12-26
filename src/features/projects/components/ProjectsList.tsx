import { Loading } from '@/components/Loading'
import { useProjects } from '@/features/projects/api/getProjects'
import { Project } from '@/features/projects/types'
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'

const ProjectItem = ({ project }: { project: Project }) => {
   return (
      <HStack
         w='full'
         borderWidth='1px'
         borderStyle='solid'
         borderColor={useColorModeValue('gray.200', 'orange.200')}
         borderRadius='sm'
         padding={10}

         justify='space-between'
      >
         <Text>{project.title}</Text>


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
