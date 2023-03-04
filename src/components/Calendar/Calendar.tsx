import { useCalendar, UseCalendarInfo } from './useCalendar'
import { Grid, useColorModeValue } from '@chakra-ui/react'
import { createContext, useContext } from 'react'
import { CalendarHeader } from '@/components/Calendar/CalendarHeader'
import { CalendarDays, IsDayMarked, OnDayClick } from './CalendarDays'
import './styles.css'

type CalendarContextType = {
   colorScheme: string
   calendar: UseCalendarInfo
   setDaysAchieved: React.Dispatch<React.SetStateAction<number>>
}
export const CalendarContext = createContext<CalendarContextType | null>(null)

export const useCalendarContext = () => {
   return useContext(CalendarContext) as CalendarContextType
}

type InitialValues = {
   isDayMarked: IsDayMarked
}

type CalendarProps = {
   colorScheme: string
   initialValues?: InitialValues
   onDayClick?: OnDayClick
   setDaysAchieved: React.Dispatch<React.SetStateAction<number>>
}

export const Calendar = ({
   colorScheme,
   initialValues,
   onDayClick,
   setDaysAchieved,
}: CalendarProps) => {
   const calendar = useCalendar()
   const bgColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.50')

   return (
      <CalendarContext.Provider
         value={{
            colorScheme,
            calendar,
            setDaysAchieved,
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
            pt={{ base: 5, md: 10 }}
            alignContent='flex-start'
            textAlign='center'
         >
            <CalendarHeader />
            <CalendarDays
               isDayMarked={initialValues?.isDayMarked}
               onDayClick={onDayClick}
            />
         </Grid>
      </CalendarContext.Provider>
   )
}
