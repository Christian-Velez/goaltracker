import { LayoutContent } from '@/components/Layout'
import { Link } from 'react-router-dom'
import { Button, Heading, HStack, Text } from '@chakra-ui/react'

export const Landing = () => {
   return (
      <LayoutContent
         minH='85vh'
         placeContent='center'
         placeItems='center'
         gap={20}
      >
         <Heading>Goal tracker</Heading>

         <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            minima adipisci hic tempore nihil consequatur eos nostrum
            doloremque, impedit sapiente quasi voluptates incidunt provident
            asperiores quibusdam distinctio autem saepe recusandae!
         </Text>

         <HStack w='full' justifyContent='center'>
            <Link to='/login'>
               <Button>Login</Button>
            </Link>

            <Link to='/register'>
               <Button variant='outline'>Register</Button>
            </Link>
         </HStack>
      </LayoutContent>
   )
}
