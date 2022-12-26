import * as yup from 'yup'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { useLogin } from '@/features/auth/api/login'
import { Button } from '@chakra-ui/react'

type LoginData = {
   email: string
   password: string
}

const schema = yup
   .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
   })
   .required()

export const LoginForm = () => {
   const mutation = useLogin()

   function onSubmit(data: LoginData) {
      mutation.login({
         variables: data,
      })
   }

   return (
      <Form<LoginData, typeof schema> onSubmit={onSubmit} schema={schema}>
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
                     label='Password'
                     type='password'
                     error={formState.errors['password']}
                     registration={register('password')}
                  />

                  <Button
                     type='submit'
                     isLoading={mutation.loading}
                     margin={20}
                  >
                     Login
                  </Button>
               </>
            )
         }}
      </Form>
   )
}
