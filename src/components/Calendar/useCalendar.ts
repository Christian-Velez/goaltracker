import {
   getCurrentMonthDates,
   getCurrentDateInfo,
   MONTHS_LABELS,
   getNext,
   getPrev,
} from './utils'
import { useMemo, useState } from 'react'

export type UseCalendarInfo = {
   currentDay: Date
   month: number
   monthLabel: string
   monthDates: Array<Date | null>
   year: number
   prevMonth: () => void
   nextMonth: () => void
   goToday: () => void
}

export const useCalendar = (): UseCalendarInfo => {
   const { currentDay, currentMonth, currentYear } = getCurrentDateInfo()

   const [month, setMonth] = useState(currentMonth)
   const [year, setYear] = useState(currentYear)

   const monthDates = useMemo(
      () => getCurrentMonthDates(month, year),
      [month, year]
   )

   function nextMonth() {
      const { nextMonthN, nextY } = getNext(month, year)
      setMonth(nextMonthN)
      setYear(nextY)
   }

   function goToday() {
      setMonth(currentMonth)
      setYear(currentYear)
   }

   function prevMonth() {
      const { prevMontN, prevY } = getPrev(month, year)
      setMonth(prevMontN)
      setYear(prevY)
   }

   return {
      currentDay,
      month,
      monthLabel: MONTHS_LABELS[month],
      monthDates,
      year,

      prevMonth,
      nextMonth,
      goToday,
   }
}
