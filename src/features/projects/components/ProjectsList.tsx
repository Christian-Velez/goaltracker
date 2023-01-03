import { useProjects } from '@/features/projects/api/getProjects'
import { ProjectItem } from '@/features/projects/components/ProjectItem/ProjectItem'
import { SearchIcon } from '@chakra-ui/icons'
import {
   Box,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
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

   return (
      <VStack
         w='full'
         pt={10}
         px={{ md: 3 }}
         borderWidth={{ md: '1px' }}
         borderStyle='solid'
         borderColor={borderColor}
         borderRadius='sm'
         minH='400px'
         justifyContent='start'
      >
         <Box
            mb={5}
            w='full'
            paddingX={{
               base: 0,
               md: 5,
            }}
            paddingY={{
               base: 3,
               md: 5,
            }}
         >
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
            <AnimatePresence>
               {filteredProjects.map((project, i) => (
                  <ProjectItem
                     index={i}
                     key={project.id}
                     project={project}
                     lastItem={i === filteredProjects.length - 1}
                  />
               ))}
            </AnimatePresence>
         ) : (
            <Box pt={20}>
               <Text>
                  {loading ? 'Loading projects...' : 'No projects found'}
               </Text>
            </Box>
         )}
      </VStack>
   )
}
