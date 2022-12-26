import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
   useColorMode,
   IconButton,
   useColorModeValue,
} from '@chakra-ui/react'

export const ThemeToggleButton = () => {
   const { toggleColorMode } = useColorMode()

   return (
      <IconButton
         aria-label='Toggle theme'
         colorScheme={useColorModeValue('purple', 'orange')}
         icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
         onClick={toggleColorMode}
      />
   )
}
