import { LAYOUT_MAX_WIDTH } from '@/components/Layout'
import { Container, ContainerProps } from '@chakra-ui/react'

type LayoutContentProps = {
   children: React.ReactNode
} & ContainerProps

export const LayoutContent = ({ children, ...rest }: LayoutContentProps) => {
   return (
      <Container
         maxW={LAYOUT_MAX_WIDTH}
         py={20}
         display='grid'
         textAlign='center'
         {...rest}
      >
         {children}
      </Container>
   )
}
