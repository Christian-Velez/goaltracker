import { useProjectsModal } from '@/features/projects/store'
import { RawProject } from '@/features/projects/types'
import {
   Badge,
   Box,
   Grid,
   GridItem,
   IconButton,
   Text,
   useColorModeValue,
   useMediaQuery,
   VStack,
} from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

type ProjectItemProps = {
   project: RawProject
   lastItem: boolean
}

export const DaysAchievedLabel = ({
   color,
   daysAchieved,
}: {
   color: string
   daysAchieved: number
}) => {
   return (
      <Badge colorScheme={color}>
         {daysAchieved} {daysAchieved === 1 ? 'day' : 'days'} achieved
      </Badge>
   )
}

export const ProjectItem = ({ project, lastItem }: ProjectItemProps) => {
   const navigate = useNavigate()
   const [isMd] = useMediaQuery('(min-width: 48em)')
   const { openModal } = useProjectsModal()

   function viewProject() {
      navigate(`/app/project/${project.id}`)
   }

   return (
      <Grid
         w='full'
         borderBottom={lastItem ? '0' : '1px'}
         borderStyle='solid'
         borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
         padding={{
            base: 5,
            md: 10,
         }}
         paddingRight='5 !important'
         templateColumns='auto min(93px)'
         gap={5}
         justifyContent='space-between'
         textAlign='start'
         onClick={viewProject}
         cursor='pointer'
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

               <Box display={{ base: 'none', md: 'inline-block' }}>
                  <DaysAchievedLabel
                     daysAchieved={project.daysAchieved}
                     color={project.color}
                  />
               </Box>
            </VStack>
         </GridItem>

         <GridItem justifySelf='flex-end'>
            <IconButton
               aria-label='Edit'
               icon={<AiFillEdit />}
               variant={useColorModeValue('ghost', 'solid')}
               colorScheme={useColorModeValue('twitter', 'gray')}
               color={useColorModeValue('blue.400', 'blue.100')}
               onClick={(e) => {
                  e.stopPropagation()
                  openModal('edit', project)
               }}
               size={isMd ? 'md' : 'sm'}
            />

            <IconButton
               aria-label='Delete'
               icon={<AiFillDelete />}
               variant={useColorModeValue('ghost', 'solid')}
               colorScheme={useColorModeValue('red', 'gray')}
               color={useColorModeValue('red.500', 'red.200')}
               onClick={(e) => {
                  e.stopPropagation()
                  openModal('delete', project)
               }}
               ml={3}
               size={isMd ? 'md' : 'sm'}
            />
         </GridItem>
      </Grid>
   )
}
