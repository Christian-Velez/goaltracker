type ControlProps = {
   isOpen: boolean
   onOpen?: () => void
   onClose: () => void
}

export type ModalProps = {
   title: string
   triggerButton?: React.ReactElement
   submitButton: React.ReactElement
   children: React.ReactNode
   isDone: boolean

   control?: ControlProps
}
