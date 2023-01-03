import { useProjectsModal } from '@/features/projects/store'
import { RawProject } from '@/features/projects/types'
import {
   Box,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   useColorModeValue,
   useMediaQuery,
} from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai'

export const SettingsMenu = ({ project }: { project: RawProject }) => {
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
