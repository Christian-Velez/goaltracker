import { useEffect, useState } from 'react'
import { useCalendarContext } from './Calendar'
import { Box, GridItem, Text, useColorModeValue } from '@chakra-ui/react'
import { dateToString, getMonthFirstDayOfWeek, isDateInMonth } from './utils'
import { motion } from 'framer-motion'
import { useDebounce } from '@/hooks/useDebounce'

export type OnDayClick = (date: Date, marked: boolean) => void
export type IsDayMarked = (date: Date) => boolean | boolean

type DayProps = {
   date: Date
   marked?: IsDayMarked
   onClick?: OnDayClick
   index: number
}

const daysVariants = {
   initial: {
      scale: 0.3,
   },

   show: {
      scale: 1,
      transition: {
         duration: 0.1,
      },
   },
}

const CalendarDay = ({ date, onClick = () => {}, marked, index }: DayProps) => {
   const { colorScheme, calendar } = useCalendarContext()
   const monthFirstDayOfWeek = getMonthFirstDayOfWeek(
      calendar.month,
      calendar.year
   )

   const [isDayMarked, setIsDayMarked] = useState(() => {
      return marked && marked(date)
   })

   useEffect(() => {
      setIsDayMarked(() => marked && marked(date))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [calendar.month])

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

   const optimizedOnClick = useDebounce(onClick, 1000)

   return (
      <GridItem
         as={motion.div}
         initial='initial'
         animate='show'
         whileTap={{
            scale: 1.2,
         }}
         variants={daysVariants}
         key={date.toString()}
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
            const marked = !isDayMarked
            setIsDayMarked(marked)
            optimizedOnClick(date, marked)
         }}
         position='relative'
         gridColumn={index === 0 ? `${monthFirstDayOfWeek + 1}/ span 1` : ''}
      >
         {isDayToday && <Box className='today' bgColor={todayMarkColor} />}
         <Text>{date?.getDate() ?? ''}</Text>
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
         {calendar.monthDates.map((date, i) => {
            if (!date) return <div key={i} />

            return (
               <CalendarDay
                  index={i}
                  key={i}
                  date={date}
                  onClick={onDayClick}
                  marked={isDayMarked}
               />
            )
         })}
      </>
   )
}
