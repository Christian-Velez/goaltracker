import { RawProject } from '@/features/projects/types'
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { SettingsMenu } from './SettingsMenu'
import { DaysAchievedLabel } from './DaysAchievedLabel'
import { motion } from 'framer-motion'

const variants = {
   hidden: {
      opacity: 0,
   },

   visible: ({ delay, index }: { delay: number; index: number }) => ({
      opacity: 1,
      transition: {
         duration: 0.4,
         delay: delay * (index + 1),
      },
   }),

   exit: {
      opacity: 0,
   },
}

type ProjectItemProps = {
   project: RawProject
   index: number
   lastItem: boolean
}

export const ProjectItem = ({ project, index, lastItem }: ProjectItemProps) => {
   const navigate = useNavigate()

   function viewProject() {
      navigate(`/app/project/${project.id}`)
   }

   return (
      <VStack
         as={motion.div}
         initial='hidden'
         animate='visible'
         exit='hidden'
         custom={{ delay: 0.1, index }}
         variants={variants}
         layoutId={project.id}
         display='flex'
         flexDirection='column'
         w='full'
         borderBottom={lastItem ? '0' : '1px'}
         borderStyle='solid'
         borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
         paddingX={{
            base: 0,
            md: 5,
         }}
         paddingY={{
            base: 3,
            md: 8,
         }}
         gap={5}
         alignItems='flex-start'
         textAlign='start'
         onClick={viewProject}
         cursor='pointer'
      >
         <HStack
            justifyContent='space-between'
            gap={5}
            w='full'
            alignItems='flex-start'
         >
            <VStack alignItems='flex-start'>
               <Text fontWeight='bold' noOfLines={2}>
                  {project.title}
               </Text>

               <DaysAchievedLabel
                  daysAchieved={project.daysAchieved}
                  color={project.color}
               />
            </VStack>

            <SettingsMenu project={project} />
         </HStack>

         <Text
            fontSize='sm'
            textAlign='justify'
            color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
            noOfLines={{ base: 3, md: 5 }}
         >
            {project.description}
         </Text>
      </VStack>
   )
}
