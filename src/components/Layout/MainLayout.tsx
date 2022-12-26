import { Container, ContainerProps } from '@chakra-ui/react'

type MainLayoutProps = {
   children: React.ReactNode
} & ContainerProps

export const MainLayout = ({ children, ...rest }: MainLayoutProps) => {
   return (
      <Container
         maxW='container.md'
         py={20}
         display='grid'
         textAlign='center'
         {...rest}
      >
         {children}
      </Container>
   )
}
