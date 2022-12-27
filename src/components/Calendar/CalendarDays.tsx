import { useCalendarContext } from './Calendar'
import { Box, GridItem, Text, useColorModeValue } from '@chakra-ui/react'
import { dateToString, isDateInMonth } from './utils'

export type OnDayClick = (date: Date) => void
export type IsDayMarked = (date: Date) => boolean | boolean

type DayProps = {
   date: Date
   marked?: IsDayMarked
   onClick?: OnDayClick
}

const CalendarDay = ({ date, onClick, marked }: DayProps) => {
   const { colorScheme, calendar } = useCalendarContext()
   const isInSelectedMonth = isDateInMonth(date, calendar.month, calendar.year)

   const colorON = useColorModeValue('gray.900', 'whiteAlpha.800')
   const colorOFF = useColorModeValue('gray.300', 'whiteAlpha.300')

   const borderON = useColorModeValue('gray.100', 'whiteAlpha.300')
   const borderOFF = useColorModeValue('blackAlpha.50', 'whiteAlpha.50')
   const border = isInSelectedMonth ? borderON : borderOFF

   const isDayToday = dateToString(date) === dateToString(calendar.currentDay)
   const todayMarkColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.900')

   const markedBorder = useColorModeValue(
      `${colorScheme}.400`,
      `${colorScheme}.300`
   )

   const isDayMarked = marked && marked(date)

   return (
      <GridItem
         style={{
            aspectRatio: '1 / 1',
         }}
         color={isInSelectedMonth ? colorON : colorOFF}
         border='2px solid'
         borderColor={isDayMarked ? markedBorder : border}
         borderRadius='full'
         fontWeight='semibold'
         display='flex'
         justifyContent='center'
         alignItems='center'
         textAlign='center'
         cursor='pointer'
         onClick={() => {
            onClick && onClick(date)
         }}
         position='relative'
      >
         {isDayToday && <Box className='today' bgColor={todayMarkColor} />}
         <Text>{date.getDate()}</Text>
      </GridItem>
   )
}

type CalendarDaysProps = {
   isDayMarked?: IsDayMarked
   onDayClick?: OnDayClick
}

export const CalendarDays = ({
   onDayClick,
   isDayMarked,
}: CalendarDaysProps) => {
   const { calendar } = useCalendarContext()
   return (
      <>
         {calendar.monthDates.map((date, i) => (
            <CalendarDay
               key={i}
               date={date}
               onClick={onDayClick}
               marked={isDayMarked}
            />
         ))}
      </>
   )
}
