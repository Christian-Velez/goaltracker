import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
   global: (props) => ({
      body: {
         bg: mode('#fbfcf8', '#202023')(props),
      },
   }),
}

const components = {
   Link: {
      baseStyle: (props) => ({
         color: mode('#3d7aed', '#ff63c3')(props),
         textUnderlineOffset: 3,
      }),
   },
}

const config = {
   initialColorMode: 'dark',
   useSystemColorMode: true,
}

const theme = extendTheme({
   config,
   components,
   styles,
})

export default theme
