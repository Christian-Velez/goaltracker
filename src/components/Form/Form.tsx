/* eslint-disable */
import * as Yup from 'yup'
import { VStack, StackProps } from '@chakra-ui/react'
import {
   DeepPartial,
   FieldValues,
   SubmitHandler,
   useForm,
   UseFormReturn,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormProps<TFormData extends FieldValues, Schema> = {
   children: (data: UseFormReturn<TFormData>) => React.ReactNode
   className?: string
   defaultValues?: DeepPartial<TFormData> | undefined
   onSubmit: SubmitHandler<TFormData>
   schema: Schema
}

export const Form = <
   TFormData extends FieldValues,
   Schema extends Yup.AnyObjectSchema
>({
   children,
   className = '',
   defaultValues,
   onSubmit,
   schema,
}: FormProps<TFormData, Schema>) => {
   const methods = useForm<TFormData>({
      resolver: yupResolver(schema),
      defaultValues,
   })

   return (
      <VStack
         noValidate
         as='form'
         className={className}
         onSubmit={methods.handleSubmit(onSubmit)}
         spacing={5}
         my={10}
      >
         {children(methods)}
      </VStack>
   )
}
