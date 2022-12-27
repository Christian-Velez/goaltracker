import { BaseEntity } from '@/types'

export const RawProjectTypeDef = `
   id
   title
   color
   daysAchieved
`

export const ProjectTypeDef = `
   ${RawProjectTypeDef}
   statusList {
      id
      date
      value
   }
`

export type Status = {
   date: number
   value?: number | null
} & BaseEntity

export type RawProject = {
   title: string
   color: string
   daysAchieved: number
} & BaseEntity

export type Project = {
   statusList: Status[]
} & RawProject
