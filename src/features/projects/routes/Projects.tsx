import { Heading, VStack } from '@chakra-ui/react'
import { ProjectsList } from '../components/ProjectsList'

export const Projects = () => {
   return (
      <VStack spacing={10}>
         <Heading>Projects</Heading>


         <ProjectsList />
      </VStack>
   )
}
