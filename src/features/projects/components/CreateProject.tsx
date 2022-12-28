import { Modal } from '@/components/Modal'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useCreateProject } from '../api/createProject'
import { ProjectForm, ProjectFormData } from './ProjectForm'

export const CreateProject = () => {
   const mutation = useCreateProject()
   const [color, setColor] = useState('pink')

   function onSubmit(data: ProjectFormData) {
      mutation.createProject({
         variables: {
            ...data,
            color,
         },
      })
   }

   return (
      <Modal
         isDone={mutation.completed}
         title='Create project'
         triggerButton={<Button>New project</Button>}
         submitButton={
            <Button
               type='submit'
               form='create_project'
               colorScheme={color}
               isLoading={mutation.loading}
            >
               Create project
            </Button>
         }
      >
         <ProjectForm
            id='create_project'
            onSubmit={onSubmit}
            color={color}
            setColor={setColor}
         />
      </Modal>
   )
}
