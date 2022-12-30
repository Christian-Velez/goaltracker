import { Status } from '@/features/status'
import { BaseEntity } from '@/types'

export const RawProjectTypeDef = `
   id
   title
   description
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

export type RawProject = {
   title: string
   description: string
   color: string
   daysAchieved: number
} & BaseEntity

export type Project = {
   statusList: Status[]
} & RawProject
