import {
   Skeleton as ChakraSkeleton,
   SkeletonProps as ChakraSProps,
   Stack,
} from '@chakra-ui/react'

type SkeletonProps = {
   number: number
} & ChakraSProps

export const Skeleton = ({
   number,
   height = '120px',
   ...rest
}: SkeletonProps) => {
   let skeletons = []
   for (let i = 0; i < number; i++) {
      skeletons.push(<ChakraSkeleton height={height} {...rest} key={i} />)
   }

   return (
      <Stack w='100%' spacing={5}>
         {skeletons}
      </Stack>
   )
}
