import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeToggleButton = () => {
   const { toggleColorMode } = useColorMode()

   return (
      <AnimatePresence exitBeforeEnter initial={false}>
         <motion.div
            style={{ display: 'inline-block' }}
            key={useColorModeValue('light', 'dark')}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
         >
            <IconButton
               aria-label='Toggle theme'
               colorScheme={useColorModeValue('purple', 'orange')}
               icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
               onClick={toggleColorMode}
            />
         </motion.div>
      </AnimatePresence>
   )
}
