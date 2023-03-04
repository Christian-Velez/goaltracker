import { useUpdateUser } from '@/features/user/api/updateUser'
import { UserData, UserForm } from '@/features/user/components/UserForm'
import { useAuth } from '@/lib/auth'
import { addNotification } from '@/lib/notifications'
import { Heading, VStack } from '@chakra-ui/react'

export const Profile = () => {
   const { user, updateUser: setUser } = useAuth()
   const updateUserMutation = useUpdateUser()

   async function onSubmit(data: UserData) {
      const r = await updateUserMutation.update({
         variables: {
            ...data,
         },
      })

      if (!r.data) return
      setUser(r.data?.updateUser)
      addNotification({
         title: 'Profile updated',
         status: 'success',
      })
   }

   return (
      <VStack spacing={10} alignItems='start'>
         <Heading>Profile</Heading>

         <UserForm
            defaultValues={{
               name: user.name ?? '',
            }}
            onSubmit={onSubmit}
            isLoading={updateUserMutation.loading}
         />
      </VStack>
   )
}
