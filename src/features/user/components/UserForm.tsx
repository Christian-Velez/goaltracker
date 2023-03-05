import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Avatar } from '@/features/user/components/Avatar'
import { Button, Checkbox } from '@chakra-ui/react'
import { DeepPartial } from 'react-hook-form'
import * as yup from 'yup'

export type UserData = {
   name: string
   password: string
   changePassword: boolean
   currentPassword: string
   newPassword: string
}

type UserFormProps = {
   defaultValues?: DeepPartial<UserData> | undefined
   onSubmit: (data: UserData) => void
   isLoading: boolean
}

const schema = yup
   .object({
      name: yup.string().min(3).required(),
      changePassword: yup.boolean().required(),

      currentPassword: yup.string().when('changePassword', {
         is: true,
         then: yup.string().min(3).required(),
      }),
      newPassword: yup.string().when('changePassword', {
         is: true,
         then: yup.string().min(3).required(),
      }),
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
         styleProps={{
            alignItems: 'start',
         }}
      >
         {({ register, formState, watch }) => {
            const changePassword = watch('changePassword')
            const seed = watch('name')

            return (
               <>
                  <Avatar seed={seed} />

                  <Input
                     label='Name'
                     error={formState.errors['name']}
                     registration={register('name')}
                  />

                  <Checkbox {...register('changePassword')}>
                     Change password
                  </Checkbox>

                  {changePassword && (
                     <>
                        <Input
                           label='Current password'
                           type='password'
                           registration={register('currentPassword')}
                           error={formState.errors['currentPassword']}
                        />

                        <Input
                           label='New password'
                           type='password'
                           registration={register('newPassword')}
                           error={formState.errors['newPassword']}
                        />
                     </>
                  )}

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
