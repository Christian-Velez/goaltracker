import { Button, useColorMode } from '@chakra-ui/react'

const Landing = () => {
   const { toggleColorMode } = useColorMode()

   return (
      <div>
         Landing
         <Button onClick={toggleColorMode}>Toggle</Button>
      </div>
   )
}
export default Landing
