import { Dictionary } from '@/types'

const CALENDAR_DISPLAYED_DAYS = 35

export const MONTHS_LABELS: Dictionary<string> = {
   0: 'January',
   1: 'February',
   2: 'March',
   3: 'April',
   4: 'May',
   5: 'June',
   6: 'July',
   7: 'August',
   8: 'September',
   9: 'October',
   10: 'November',
   11: 'December',
}

export const dateToString = (date: Date) => {
   return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const isDateInMonth = (date: Date, month: number, year: number) => {
   return date.getMonth() === month && date.getFullYear() === year
}

export const getCurrentDateInfo = () => {
   const currentDay = new Date()
   const currentMonth = currentDay.getMonth()
   const currentYear = currentDay.getUTCFullYear()

   return {
      currentDay,
      currentMonth,
      currentYear,
   }
}

export const getNext = (month: number, year: number) => {
   const nextMonthN = month + 1 > 11 ? 0 : month + 1
   const nextY = nextMonthN === 0 ? year + 1 : year

   return {
      nextMonthN,
      nextY,
   }
}

export const getPrev = (month: number, year: number) => {
   const prevMontN = month - 1 < 0 ? 11 : month - 1
   const prevY = prevMontN === 11 ? year - 1 : year

   return {
      prevMontN,
      prevY,
   }
}

const getDaysInMonth = (month: number, year: number) =>
   new Date(year, month + 1, 0).getDate()

const getMonthFirstDayOfWeek = (month: number, year: number) =>
   new Date(year, month).getDay()

export const getCurrentMonthDates = (month: number, year: number) => {
   const days: Date[] = []

   const currentMonth = {
      firstDateDayOfWeek: getMonthFirstDayOfWeek(month, year),
      nDays: getDaysInMonth(month, year),
   }

   const { prevMontN, prevY } = getPrev(month, year)
   const { nextMonthN, nextY } = getNext(month, year)

   const prevMonth = {
      nDays: getDaysInMonth(prevMontN, prevY),
   }

   // Current month days
   for (let i = 1; i <= currentMonth.nDays; i++) {
      days.push(new Date(year, month, i))
   }

   // Prev month days
   if (currentMonth.firstDateDayOfWeek !== 6) {
      for (let i = 1; i <= currentMonth.firstDateDayOfWeek; i++) {
         days.unshift(new Date(year, month - 1, prevMonth.nDays - i))
      }
   }

   // Next month days
   const daysLeft = CALENDAR_DISPLAYED_DAYS - days.length

   for (let i = 1; i <= daysLeft; i++) {
      days.push(new Date(nextY, nextMonthN, i))
   }

   return days
}
