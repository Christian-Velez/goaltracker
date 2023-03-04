import { useRef } from 'react'
import { debounce } from 'lodash'

export const useDebounce = (func: (...args: any) => any, wait: number) => {
   return useRef(debounce(func, wait)).current
}
