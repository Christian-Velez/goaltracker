import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
   global: (props: any) => ({
      body: {
         bg: mode('#fbfcf8', '#202023')(props),
      },
   }),
}

const components = {
   Link: {
      baseStyle: (props: any) => ({
         color: mode('#3d7aed', 'pink.300')(props),
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
