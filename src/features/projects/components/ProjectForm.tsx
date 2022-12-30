import * as yup from 'yup'
import { Input } from '@/components/Input'
import { ColorPicker } from '@/components/ColorPicker'
import { Form } from '@/components/Form'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Textarea,
} from '@chakra-ui/react'
import { capitalizeFirstLetter } from '@/utils/format'

const schema = yup
   .object({
      title: yup.string().min(5).required(),
      description: yup.string().max(250),
   })
   .required()

export type ProjectFormData = {
   title: string
   description: string
}

type ProjectFormProps = {
   id: string
   color: string
   setColor: (c: string) => void
   onSubmit: (data: ProjectFormData) => void
   defaultValues?: ProjectFormData
}

export const ProjectForm = ({
   id,
   defaultValues,
   onSubmit,
   color,
   setColor,
}: ProjectFormProps) => {
   return (
      <Form<ProjectFormData, typeof schema>
         id={id}
         defaultValues={defaultValues}
         onSubmit={onSubmit}
         schema={schema}
         styleProps={{
            gap: 5,
            my: 5,
         }}
      >
         {({ register, formState }) => {
            const descriptionHasError = Boolean(formState.errors['description'])

            return (
               <>
                  <Input
                     label='Title'
                     error={formState.errors['title']}
                     registration={register('title')}
                  />

                  <FormControl isInvalid={descriptionHasError}>
                     <FormLabel>Description</FormLabel>
                     <Textarea maxLength={250} {...register('description')} />
                     <FormErrorMessage>
                        {descriptionHasError &&
                           capitalizeFirstLetter(
                              formState.errors['description']?.message as string
                           )}
                     </FormErrorMessage>
                  </FormControl>

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
