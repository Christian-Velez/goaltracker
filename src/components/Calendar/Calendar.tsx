import {
   Box,
   Grid,
   GridItem,
   IconButton,
   Text,
   useColorModeValue,
} from '@chakra-ui/react'
import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import './styles.css'

type CalendarContextType = {
   colorScheme: string
}
const CalendarContext = createContext<CalendarContextType>({
   colorScheme: 'red',
})

const DayLabel = ({ children }: { children: string }) => {
   return (
      <GridItem>
         <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.500')}
            fontWeight='bold'
         >
            {children}
         </Text>
      </GridItem>
   )
}

const Day = ({ children }: { children: string }) => {
   const [marked, setMarked] = useState(false)

   const { colorScheme } = useContext(CalendarContext)

   const color = useColorModeValue('gray.600', 'whiteAlpha.800')

   const markedBorder = useColorModeValue(
      `${colorScheme}.400`,
      `${colorScheme}.300`
   )

   const border = useColorModeValue('gray.50', 'whiteAlpha.100')

   const today = Number(children) === 26
   const todayColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.900')

   return (
      <GridItem
         style={{
            aspectRatio: '1 / 1',
         }}
         color={color}
         fontWeight='semibold'
         borderRadius='full'
         border='2px solid'
         borderColor={marked ? markedBorder : border}
         display='flex'
         justifyContent='center'
         alignItems='center'
         textAlign='center'
         cursor='pointer'
         onClick={() => setMarked(!marked)}
         position='relative'
      >
         {today && <Box className='today' bgColor={todayColor} />}
         <Text>{children}</Text>
      </GridItem>
   )
}

const Header = () => {
   return (
      <>
         <GridItem colSpan={7}>
            <Grid w='full' templateColumns='30px auto 30px' alignItems='center'>
               <Box>
                  <IconButton
                     aria-label='previous month'
                     variant='ghost'
                     fontSize='1.4rem'
                     icon={<BiChevronLeft />}
                  />
               </Box>
               <Box>
                  <Text
                     fontWeight='semibold'
                     fontSize='lg'
                     color={useColorModeValue('gray.900', 'whiteAlpha.900')}
                  >
                     December 2020
                  </Text>
               </Box>
               <Box>
                  <IconButton
                     aria-label='next month'
                     variant='ghost'
                     fontSize='1.4rem'
                     icon={<BiChevronRight />}
                  />
               </Box>
            </Grid>
         </GridItem>

         <DayLabel>Mo</DayLabel>
         <DayLabel>Mo</DayLabel>
         <DayLabel>Tu</DayLabel>
         <DayLabel>We</DayLabel>
         <DayLabel>Th</DayLabel>
         <DayLabel>Fr</DayLabel>
         <DayLabel>Sa</DayLabel>
      </>
   )
}

type CalendarProps = {
   colorScheme: string
}

export const Calendar = ({ colorScheme }: CalendarProps) => {
   const bgColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.50')

   let days = []

   for (let i = 0; i < 35; i++) {
      days.push(<Day key={i}>{`${i}`}</Day>)
   }

   return (
      <CalendarContext.Provider
         value={{
            colorScheme,
         }}
      >
         <Grid
            w='full'
            minH='400px'
            templateColumns='repeat(7, 1fr)'
            gap={{
               base: 2,
               sm: 5,
               md: 10,
            }}
            p={{ base: 5, md: 10 }}
            bgColor={bgColor}
            boxShadow='md'
            borderRadius='xl'
            pt={10}
         >
            <Header />

            {days}
         </Grid>
      </CalendarContext.Provider>
   )
}
