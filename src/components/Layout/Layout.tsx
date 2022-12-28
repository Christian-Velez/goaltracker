import { LAYOUT_MAX_WIDTH } from '@/components/Layout'
import { LayoutContent } from '@/components/Layout/LayoutContent'
import { Navbar } from '@/components/Navbar'
import { Container } from '@chakra-ui/react'

type LayoutProps = {
   children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
   return (
      <Container py={5} maxW={LAYOUT_MAX_WIDTH}>
         <Navbar />
         <LayoutContent>{children}</LayoutContent>
      </Container>
   )
}
