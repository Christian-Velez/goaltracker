import { BaseEntity } from '@/types'

export const ProjectTypeDef = `
   id
   title
   color
   statusList {
      id
      date
      value
   }
`

type Status = {
   date: number
   value?: number | null
} & BaseEntity

export type Project = {
   title: string
   color: string
   status: Status[]
} & BaseEntity
