import * as yup from 'yup'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Button } from '@chakra-ui/react'
import { useRegister } from '../api/register'

type RegisterData = {
   email: string
   name: string
   password: string
}

type RegisterFormProps = {
   onSuccess?: () => void
}

const schema = yup
   .object({
      email: yup.string().email().required(),
      name: yup.string().min(6).required(),
      password: yup.string().min(6).required(),
   })
   .required()

export const RegisterForm = ({ onSuccess = () => {} }: RegisterFormProps) => {
   const mutation = useRegister()

   async function onSubmit(data: RegisterData) {
      mutation.register({
         variables: data,
      })

      onSuccess()
   }

   return (
      <Form<RegisterData, typeof schema> onSubmit={onSubmit} schema={schema}>
         {({ register, formState }) => {
            return (
               <>
                  <Input
                     label='Email'
                     type='email'
                     error={formState.errors['email']}
                     registration={register('email')}
                  />

                  <Input
                     label='Name'
                     error={formState.errors['name']}
                     registration={register('name')}
                  />

                  <Input
                     label='Password'
                     type='password'
                     error={formState.errors['password']}
                     registration={register('password')}
                  />

                  <Button type='submit' isLoading={mutation.loading}>
                     Register
                  </Button>
               </>
            )
         }}
      </Form>
   )
}
