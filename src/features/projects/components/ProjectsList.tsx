import { Skeleton } from '@/components/Skeleton'
import { useProjects } from '@/features/projects/api/getProjects'
import { ProjectItem } from '@/features/projects/components/ProjectItem'
import { SearchIcon } from '@chakra-ui/icons'
import {
   Box,
   Grid,
   GridItem,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
   useColorModeValue,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'

export const ProjectsList = () => {
   const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
   const { projects, loading } = useProjects()
   const [text, setText] = useState('')

   const filteredProjects = useMemo(() => {
      if (!text) return projects

      return projects?.filter((project) =>
         project.title.toLowerCase().includes(text.toLowerCase())
      )
   }, [text, projects])

   if (loading) return <Skeleton number={10} />

   return (
      <Grid
         w='full'
         pt={10}
         px={3}
         borderWidth='1px'
         borderStyle='solid'
         borderColor={borderColor}
         borderRadius='sm'
         minH='400px'
         alignContent='start'
      >
         <Box px={5} mb={5}>
            <InputGroup>
               <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
               />
               <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder='Search by title'
               />
            </InputGroup>
         </Box>

         {filteredProjects?.length ? (
            filteredProjects.map((project, i) => (
               <ProjectItem
                  key={project.id}
                  project={project}
                  lastItem={i === filteredProjects.length - 1}
               />
            ))
         ) : (
            <GridItem pt={20}>
               <Text>No projects found</Text>
            </GridItem>
         )}
      </Grid>
   )
}
