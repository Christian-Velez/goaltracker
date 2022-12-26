import { LAYOUT_MAX_WIDTH } from '@/components/Layout'
import { Container, ContainerProps } from '@chakra-ui/react'

type MainLayoutProps = {
   children: React.ReactNode
} & ContainerProps

export const MainLayout = ({ children, ...rest }: MainLayoutProps) => {
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
