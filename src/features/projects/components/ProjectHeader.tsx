import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const ProjectHeader = ({
   children: projectTitle = '',
}: {
   children?: string
}) => {
   const navigate = useNavigate()

   return (
      <HStack w='full' justifyContent='space-between' textAlign='center'>
         <Box>
            <IconButton
               aria-label='Home'
               icon={<ArrowBackIcon />}
               onClick={() => navigate('/')}
               variant='ghost'
            />
         </Box>

         <Heading
            fontSize={{
               base: 'xl',
               md: '3xl',
            }}
         >
            {projectTitle}
         </Heading>

         <Box />
      </HStack>
   )
}
