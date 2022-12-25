import {
   IconButton,
   Input as ChakraInput,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export type FieldProps = {
   type?: React.HTMLInputTypeAttribute
   registration: Partial<UseFormRegisterReturn>
}

export const Field = ({ type, registration }: FieldProps) => {
   const [show, setShow] = useState(false)

   if (type === 'password') {
      return (
         <InputGroup size='md'>
            <ChakraInput
               pr='4.5rem'
               type={show ? 'text' : 'password'}
               placeholder='Enter password'
               {...registration}
            />

            <InputRightElement width='4.5rem'>
               <IconButton
                  aria-label='toggle visibility'
                  h='1.75rem'
                  variant='unstyled'
                  fontSize='1.4rem'
                  size='sm'
                  onClick={() => setShow((s) => !s)}
                  icon={show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
               />
            </InputRightElement>
         </InputGroup>
      )
   }

   return <ChakraInput type={type} {...registration} />
}
