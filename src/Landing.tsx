import { useAuth } from '@/lib/auth'
import { Button, useColorMode } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
   const navigate = useNavigate()
   const { isAuthenticated } = useAuth()
   const { toggleColorMode } = useColorMode()

   const handleStart = () => {
      if (isAuthenticated) {
         navigate('/app', { replace: true })
      } else {
         navigate('/register')
      }
   }

   return (
      <div>
         Main
         <Button onClick={toggleColorMode}>TOGGLE</Button>
         <Button onClick={handleStart}>ENTRAR</Button>
      </div>
   )
}
export default Landing
