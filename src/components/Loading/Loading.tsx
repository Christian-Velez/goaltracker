import {
   Box,
   Heading,
   Progress,
   Text,
   useColorModeValue,
} from '@chakra-ui/react'

type Size = 'sm' | 'lg'
type LoadingProps = {
   text?: string
   size?: Size
}

export const Loading = ({
   text = 'Goal Tracker',
   size = 'sm',
}: LoadingProps) => {
   return (
      <Box display='grid' gap={10} placeContent='center' placeItems='center'>
         {size === 'lg' ? (
            <Heading>{text}</Heading>
         ) : (
            <Text fontWeight='semibold'>{text}</Text>
         )}

         <Progress
            size='xs'
            colorScheme={useColorModeValue('purple', 'orange')}
            w='400px'
            maxW='80vw'
            isIndeterminate
         />
      </Box>
   )
}

export const LoadingScreen = (props: LoadingProps) => {
   return (
      <Box h='85vh' w='full' display='grid'>
         <Loading {...props} size='lg' />
      </Box>
   )
}
