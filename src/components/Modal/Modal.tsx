import React, { useEffect } from 'react'
import {
   Button,
   useDisclosure,
   Modal as ChakraModal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
} from '@chakra-ui/react'
import { ModalProps } from './types'

export const Modal = ({
   title,
   triggerButton,
   submitButton,
   isDone,
   children,
   control,
}: ModalProps) => {
   const localControl = useDisclosure()
   const { onClose, onOpen, isOpen } = control || localControl

   useEffect(() => {
      if (isDone) {
         onClose()
      }
   }, [isDone, onClose])

   return (
      <>
         {triggerButton &&
            React.cloneElement(triggerButton, { onClick: onOpen })}

         <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>{children}</ModalBody>

               <ModalFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                     Cancel
                  </Button>

                  {submitButton}
               </ModalFooter>
            </ModalContent>
         </ChakraModal>
      </>
   )
}
