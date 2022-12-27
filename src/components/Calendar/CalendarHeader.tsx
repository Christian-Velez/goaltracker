import { useCalendarContext } from '@/components/Calendar/Calendar'
import {
   Box,
   Grid,
   GridItem,
   IconButton,
   Text,
   useColorModeValue,
} from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { CgCalendarToday } from 'react-icons/cg'

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

type CalendarHeaderProps = {
   children?: string
}

export const CalendarHeader = ({ children }: CalendarHeaderProps) => {
   const { calendar } = useCalendarContext()
   const { monthLabel, year } = calendar
   const headerTitle = children ?? `${monthLabel} ${year}`

   return (
      <>
         <GridItem colSpan={7}>
            <IconButton
               aria-label='today'
               variant='ghost'
               size='sm'
               icon={<CgCalendarToday />}
               onClick={() => calendar.goToday()}
               float='left'
            />

            <Grid w='full' templateColumns='30px auto 30px' alignItems='center'>
               <Box>
                  <IconButton
                     aria-label='previous month'
                     variant='ghost'
                     fontSize='1.4rem'
                     icon={<BiChevronLeft />}
                     onClick={() => calendar.prevMonth()}
                  />
               </Box>
               <Box>
                  <Text
                     fontWeight='semibold'
                     fontSize='lg'
                     color={useColorModeValue('gray.900', 'whiteAlpha.900')}
                  >
                     {headerTitle}
                  </Text>
               </Box>
               <Box>
                  <IconButton
                     aria-label='next month'
                     variant='ghost'
                     fontSize='1.4rem'
                     icon={<BiChevronRight />}
                     onClick={() => calendar.nextMonth()}
                  />
               </Box>
            </Grid>
         </GridItem>

         <DayLabel>Su</DayLabel>
         <DayLabel>Mo</DayLabel>
         <DayLabel>Tu</DayLabel>
         <DayLabel>We</DayLabel>
         <DayLabel>Th</DayLabel>
         <DayLabel>Fr</DayLabel>
         <DayLabel>Sa</DayLabel>
      </>
   )
}
