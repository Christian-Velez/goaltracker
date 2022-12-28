import { dateToString } from '@/components/Calendar/utils'
import { Status } from '@/features/status'

export const formatStatusList = (statusList: Status[] | undefined) => {
   if (!statusList) return []

   return statusList.map((s) => {
      const d = new Date(Number(s.date))
      return dateToString(d)
   })
}

export const getDateId = (statusList: Status[], date: Date) => {
   const status = statusList.find((status) => {
      const d = dateToString(new Date(Number(status.date)))
      return d === dateToString(date)
   })

   return status?.id
}
