import * as yup from 'yup'
import { Input } from '@/components/Input'
import { ColorPicker } from '@/components/ColorPicker'
import { Form } from '@/components/Form'

const schema = yup
   .object({
      title: yup.string().min(5).required(),
   })
   .required()

export type ProjectFormData = {
   title: string
}

type ProjectFormProps = {
   color: string
   setColor: (c: string) => void
   onSubmit: (data: ProjectFormData) => void
}

export const ProjectForm = ({
   onSubmit,
   color,
   setColor,
}: ProjectFormProps) => {
   return (
      <Form<ProjectFormData, typeof schema>
         id='create_project'
         onSubmit={onSubmit}
         schema={schema}
         styleProps={{
            gap: 5,
            my: 5,
         }}
      >
         {({ register, formState }) => {
            return (
               <>
                  <Input
                     label='Title'
                     error={formState.errors['title']}
                     registration={register('title')}
                  />

                  <ColorPicker
                     label='Color scheme'
                     value={color}
                     setValue={(c) => setColor(c)}
                  />
               </>
            )
         }}
      </Form>
   )
}
