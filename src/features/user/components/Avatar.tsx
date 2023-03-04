import { useState, useEffect } from 'react'
import { icons } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { Avatar as ChakraAvatar } from '@chakra-ui/react'

type AvatarProps = {
   seed: string
}

export const Avatar = ({ seed }: AvatarProps) => {
   const [src, setSrc] = useState('')
   const avatar = createAvatar(icons, {
      seed,
   })

   useEffect(() => {
      avatar.toDataUri().then(setSrc)
   }, [avatar])

   return <ChakraAvatar src={src} size='4xl' />
}
