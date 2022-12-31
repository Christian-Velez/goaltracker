import {
   Skeleton as ChakraSkeleton,
   SkeletonProps as ChakraSProps,
   Stack,
   useColorModeValue,
} from '@chakra-ui/react'

type SkeletonProps = {
   number: number
} & ChakraSProps

export const Skeleton = ({
   number,
   height = '120px',
   ...rest
}: SkeletonProps) => {
   const startColor = useColorModeValue('', 'brand.200')
   const endColor = useColorModeValue('', 'brand.400')

   let skeletons = []

   for (let i = 0; i < number; i++) {
      skeletons.push(
         <ChakraSkeleton
            height={height}
            key={i}
            startColor={startColor}
            endColor={endColor}
            {...rest}
         />
      )
   }

   return (
      <Stack w='100%' spacing={5}>
         {skeletons}
      </Stack>
   )
}
