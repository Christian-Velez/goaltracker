import { StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { menuAnatomy, modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle: defineMenu, defineMultiStyleConfig: menuConfig } =
   createMultiStyleConfigHelpers(menuAnatomy.keys)

const { definePartsStyle: defineModal, defineMultiStyleConfig: modalConfig } =
   createMultiStyleConfigHelpers(modalAnatomy.keys)

const menuStyle = defineMenu({
   item: {
      _dark: {
         backgroundColor: 'brand.400',

         _hover: {
            backgroundColor: 'brand.300',
         },
      },
   },

   list: {
      _dark: {
         backgroundColor: 'brand.400',
      },
   },
})

const modalStyle = defineModal({
   dialog: {
      _dark: {
         backgroundColor: 'brand.400',
      },
   },
})

const Menu = menuConfig({ baseStyle: menuStyle })
const Modal = modalConfig({ baseStyle: modalStyle })

export const components = {
   Link: {
      baseStyle: (props: StyleFunctionProps) => ({
         color: mode('#3d7aed', 'pink.300')(props),
         textUnderlineOffset: 3,
      }),
   },
   Menu,
   Modal,

   Skeleton: {
      baseStyle: {
         bgColor: 'red.50',
      },
   },
}
