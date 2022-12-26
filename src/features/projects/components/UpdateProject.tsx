import { useEffect, useState } from 'react'
import { Modal } from '@/components/Modal'
import { Button } from '@chakra-ui/react'
import { useUpdateProject } from '../api/updateProject'
import { ProjectForm, ProjectFormData } from './ProjectForm'
import { useProjectsContext } from '../store'

export const UpdateProject = () => {
   const mutation = useUpdateProject()
   const [color, setColor] = useState('pink')
   const { closeEditModal, isEditModalOpen, data } = useProjectsContext()

   function onSubmit(formData: ProjectFormData) {
      mutation.updateProject({
         variables: {
            ...formData,
            color,
            id: data!.id,
         },
      })
   }

   useEffect(() => {
      data?.color && setColor(data?.color)
   }, [data?.color])

   return (
      <Modal
         control={{
            isOpen: isEditModalOpen,
            onClose: closeEditModal,
         }}
         isDone={mutation.completed}
         title='Edit project'
         submitButton={
            <Button
               form='edit_project'
               type='submit'
               colorScheme={color}
               isLoading={mutation.loading}
            >
               Edit project
            </Button>
         }
      >
         <ProjectForm
            id='edit_project'
            onSubmit={onSubmit}
            color={color}
            setColor={setColor}
            defaultValues={data}
         />
      </Modal>
   )
}
