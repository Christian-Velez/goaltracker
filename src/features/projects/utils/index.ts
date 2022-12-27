import { dateToString } from '@/components/Calendar/utils'
import { Status } from '../types'

export const formatStatusList = (statusList: Status[] | undefined) => {
   if(!statusList)
      return []

   return statusList.map((s) => {
      const d = new Date(Number(s.date))
      return dateToString(d)
   })
}
