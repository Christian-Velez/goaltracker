import { Box, Heading, Progress } from '@chakra-ui/react'

export const Fallback = () => {
   return (
      <Box
         h='100vh'
         w='full'
         display='grid'
         placeContent='center'
         placeItems='center'
         gap={10}
      >
         <Heading>GoalTracker</Heading>
         <Progress size='xs' colorScheme='purple' w='400px' isIndeterminate />
      </Box>
   )
}
