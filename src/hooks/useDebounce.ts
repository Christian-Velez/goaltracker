import { useRef } from 'react'
import { debounce } from 'lodash'

export function useDebounce(func: (...args: any) => any, wait: number) {
   return useRef(debounce(func, wait)).current
}
