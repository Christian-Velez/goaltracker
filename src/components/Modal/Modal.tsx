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

type ModalProps = {
   title: string
   triggerButton: React.ReactElement
   submitButton: React.ReactElement
   children: React.ReactNode
   isDone: boolean
}

export const Modal = ({
   title,
   triggerButton,
   submitButton,
   isDone,
   children,
}: ModalProps) => {
   const { onClose, onOpen, isOpen } = useDisclosure()

   useEffect(() => {
      if (isDone) onClose()
   }, [isDone, onClose])

   return (
      <>
         {React.cloneElement(triggerButton, { onClick: onOpen })}

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
