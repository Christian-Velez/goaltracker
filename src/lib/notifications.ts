import { createStandaloneToast, UseToastOptions } from '@chakra-ui/toast'
const { ToastContainer, toast } = createStandaloneToast()

export const addNotification = (n: UseToastOptions) => {
   toast(n)
}

export const NotificationContainer = ToastContainer
