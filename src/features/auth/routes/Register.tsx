import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Heading, Link as ChakraLink, Text } from '@chakra-ui/react'
import { RegisterForm } from '../components/RegisterForm'
import { LayoutContent } from '@/components/Layout'

export const Register = () => {
   const navigate = useNavigate()

   return (
      <LayoutContent>
         <Heading fontSize='2xl'>Register</Heading>

         <RegisterForm
            onSuccess={() => {
               navigate('/app')
            }}
         />

         <Text>
            Already have an account?{' '}
            <ChakraLink as={Link} to='/login'>
               Sign in
            </ChakraLink>
         </Text>
      </LayoutContent>
   )
}
