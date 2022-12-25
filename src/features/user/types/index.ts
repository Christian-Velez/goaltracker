import { BaseEntity } from '@/types'

export type User = {
   name: string
   email: string
   img?: string
} & BaseEntity

export const UserTypeDef = `
   id
   name
   email
   img
`
