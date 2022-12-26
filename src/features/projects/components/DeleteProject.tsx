import { Modal } from '@/components/Modal'
import { Button, Text } from '@chakra-ui/react'
import { useDeleteProject } from '../api/deleteProject'
import { useProjectsModal } from '../store'

export const DeleteProject = () => {
   const mutation = useDeleteProject()
   const { closeModal, isOpen, type, data } = useProjectsModal()

   function onSubmit() {
      mutation.deleteProject({
         variables: {
            id: data!.id,
         },
      })
   }

   return (
      <Modal
         control={{
            isOpen: isOpen && type === 'delete',
            onClose: closeModal,
         }}
         isDone={mutation.completed}
         title='Delete project'
         submitButton={
            <Button
               type='submit'
               colorScheme='red'
               isLoading={mutation.loading}
               onClick={onSubmit}
            >
               Confirm
            </Button>
         }
      >
         <Text>
            Are you sure you want to delete project "{`${data?.title}`}" ?
         </Text>
      </Modal>
   )
}
