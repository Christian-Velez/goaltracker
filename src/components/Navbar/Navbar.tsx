import { Link } from 'react-router-dom'
import {
   Box,
   Button,
   Flex,
   IconButton,
   Link as ChakraLink,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Stack,
   useColorModeValue,
} from '@chakra-ui/react'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/auth'
import { LAYOUT_MAX_WIDTH } from '@/components/Layout'

type NavLink = {
   to: string
   label: string
}

const navigation: NavLink[] = [
   {
      to: '/app',
      label: 'Projects',
   },
   {
      to: '/profile',
      label: 'Profile',
   },
]

const NavItem = ({ item }: { item: NavLink }) => {
   return (
      <ChakraLink as={Link} to={item.to} color='whiteAlpha'>
         {item.label}
      </ChakraLink>
   )
}

const LogoutButton = () => {
   const { logout } = useAuth()

   return (
      <Button
         variant='link'
         onClick={logout}
         color={useColorModeValue('#3d7aed', 'orange.300')}
      >
         Logout
      </Button>
   )
}

export const Navbar = () => {
   return (
      <Box as='nav' w='100%' zIndex={2}>
         <Flex
            display='flex'
            maxW={LAYOUT_MAX_WIDTH}
            wrap='wrap'
            align='center'
            justify='space-between'
         >
            <Stack
               direction={{ base: 'column', md: 'row' }}
               display={{ base: 'none', md: 'flex' }}
               width={{ base: 'full', md: 'auto' }}
               alignItems='center'
               w='full'
               spacing={10}
               mt={{ base: 4, md: 0 }}
            >
               {navigation.map((item) => (
                  <NavItem key={item.to} item={item} />
               ))}

               <LogoutButton />
            </Stack>

            <Flex flex={1} justifyContent='flex-end'>
               <ThemeToggleButton />

               <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                  <Menu isLazy id='navbar-menu'>
                     <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        variant='outline'
                        aria-label='Options'
                     />
                     <MenuList>
                        {navigation.map((item) => (
                           <MenuItem key={item.to}>
                              <NavItem item={item} />
                           </MenuItem>
                        ))}

                        <MenuItem>
                           <LogoutButton />
                        </MenuItem>
                     </MenuList>
                  </Menu>
               </Box>
            </Flex>
         </Flex>
      </Box>
   )
}
