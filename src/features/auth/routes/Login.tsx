import { Link } from 'react-router-dom'
import { Heading, Link as ChakraLink, Text } from '@chakra-ui/react'
import { LoginForm } from '../components/LoginForm'
import { LayoutContent } from '@/components/Layout'

export const Login = () => {
   return (
      <LayoutContent
         minH='85vh'
         display='flex'
         flexDir='column'
         justifyContent='center'
         w='full'
         gap={20}
      >
         <Heading fontSize='2xl'>Log in</Heading>
         <LoginForm />

         <Text>
            Don't have an accout yet?{' '}
            <ChakraLink as={Link} to='/register'>
               Register here
            </ChakraLink>
         </Text>
      </LayoutContent>
   )
}
