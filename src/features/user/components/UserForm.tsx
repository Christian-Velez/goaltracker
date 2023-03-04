import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Avatar } from '@/features/user/components/Avatar'
import { Button } from '@chakra-ui/react'
import { DeepPartial } from 'react-hook-form'
import * as yup from 'yup'

export type UserData = {
   name: string
   password: string
}

type UserFormProps = {
   defaultValues?: DeepPartial<UserData> | undefined
   onSubmit: (data: UserData) => void
   isLoading: boolean
}

const schema = yup
   .object({
      name: yup.string().min(3).required(),
   })
   .required()

export const UserForm = ({
   defaultValues,
   onSubmit,
   isLoading,
}: UserFormProps) => {
   return (
      <Form<UserData, typeof schema>
         onSubmit={onSubmit}
         schema={schema}
         defaultValues={defaultValues}
      >
         {({ register, formState, watch }) => {
            const seed = watch('name')

            return (
               <>
                  <Avatar seed={seed} />

                  <Input
                     label='Name'
                     error={formState.errors['name']}
                     registration={register('name')}
                  />

                  <Button
                     type='submit'
                     isLoading={isLoading}
                     margin={20}
                     w='full'
                  >
                     Save
                  </Button>
               </>
            )
         }}
      </Form>
   )
}
