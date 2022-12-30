import { useProjectsModal } from '@/features/projects/store'
import { RawProject } from '@/features/projects/types'
import {
   Box,
   HStack,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Tag,
   Text,
   useColorModeValue,
   useMediaQuery,
   VStack,
} from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai'
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
      <Tag colorScheme={color}>
         {daysAchieved} {daysAchieved === 1 ? 'day' : 'days'} achieved
      </Tag>
   )
}

const SettingsMenu = ({ project }: { project: RawProject }) => {
   const [isMd] = useMediaQuery('(min-width: 48em)')
   const { openModal } = useProjectsModal()

   return (
      <Box>
         <Menu direction='ltr'>
            <MenuButton
               as={IconButton}
               aria-label='Options'
               icon={<AiFillSetting />}
               variant={useColorModeValue('ghost', 'solid')}
               colorScheme={useColorModeValue('twitter', 'gray')}
               color={useColorModeValue('blue.400', 'blue.100')}
               size={isMd ? 'md' : 'sm'}
               onClick={(e) => e.stopPropagation()}
            />

            <MenuList zIndex={10}>
               <MenuItem
                  icon={<AiFillEdit />}
                  onClick={(e) => {
                     e.stopPropagation()
                     openModal('edit', project)
                  }}
               >
                  Edit
               </MenuItem>
               <MenuItem
                  icon={<AiFillDelete />}
                  onClick={(e) => {
                     e.stopPropagation()
                     openModal('delete', project)
                  }}
               >
                  Delete
               </MenuItem>
            </MenuList>
         </Menu>
      </Box>
   )
}

export const ProjectItem = ({ project, lastItem }: ProjectItemProps) => {
   const navigate = useNavigate()

   function viewProject() {
      navigate(`/app/project/${project.id}`)
   }

   return (
      <VStack
         w='full'
         borderBottom={lastItem ? '0' : '1px'}
         borderStyle='solid'
         borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
         padding={{
            base: 3,
            md: 10,
         }}
         spacing={5}
         alignItems='flex-start'
         textAlign='start'
         onClick={viewProject}
         cursor='pointer'
      >
         <HStack
            justifyContent='space-between'
            gap={5}
            w='full'
            alignItems='flex-start'
         >
            <VStack alignItems='flex-start'>
               <Text fontWeight='bold' noOfLines={2}>
                  {project.title}
               </Text>

               <DaysAchievedLabel
                  daysAchieved={project.daysAchieved}
                  color={project.color}
               />
            </VStack>

            <SettingsMenu project={project} />
         </HStack>

         <Text
            fontSize='sm'
            textAlign='justify'
            color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
            noOfLines={{ base: 3, md: 5 }}
         >
            {project.description}
         </Text>
      </VStack>
   )
}
