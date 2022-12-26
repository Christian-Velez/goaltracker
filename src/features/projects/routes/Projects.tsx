import { Heading, VStack } from '@chakra-ui/react'
import { ProjectsList } from '../components/ProjectsList'
import { StoreProvider } from '../store'
import { CreateProject } from '../components/CreateProject'
import { UpdateProject } from '../components/UpdateProject'

export const Projects = () => {
   return (
      <StoreProvider>
         <VStack spacing={10}>
            <Heading>Projects</Heading>

            <CreateProject />
            <UpdateProject />

            <ProjectsList />
         </VStack>
      </StoreProvider>
   )
}
