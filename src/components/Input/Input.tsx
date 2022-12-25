import { capitalizeFirstLetter } from '@/utils/format'
import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
} from '@chakra-ui/react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { FieldProps, Field } from './Field'

type InputProps = FieldProps & {
   error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
   helperText?: string
   label: string
}

export const Input = ({
   error,
   helperText,
   label,
   registration,
   type = 'text',
}: InputProps) => {
   const isInvalid = Boolean(error?.message)

   return (
      <FormControl isInvalid={isInvalid}>
         <FormLabel>{label}</FormLabel>

         <Field registration={registration} type={type} />

         {helperText && <FormHelperText>{helperText}</FormHelperText>}
         {isInvalid && (
            <FormErrorMessage>
               {capitalizeFirstLetter(error?.message as string)}
            </FormErrorMessage>
         )}
      </FormControl>
   )
}
