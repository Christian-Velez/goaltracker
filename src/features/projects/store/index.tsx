import { createContext, useContext, useState, useCallback } from 'react'
import { RawProject } from '../types'

type ModalType = 'edit' | 'delete'

type StoreProviderProps = {
   children: React.ReactNode
}

type ProjectContextData = {
   isOpen: boolean
   type: ModalType
   openModal: (type: ModalType, data: RawProject) => void
   closeModal: () => void
   data?: RawProject
}

const ProjectsContext = createContext<ProjectContextData | null>(null)

export const useProjectsModal = () => {
   return useContext(ProjectsContext) as ProjectContextData
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
   const [data, setData] = useState<RawProject>()
   const [type, setType] = useState<ModalType>('edit')
   const [isOpen, setIsOpen] = useState(false)

   const closeModal = useCallback(() => {
      setIsOpen(false)
   }, [])

   const openModal = useCallback((type: ModalType, data: RawProject) => {
      setType(type)
      setData(data)
      setIsOpen(true)
   }, [])

   return (
      <ProjectsContext.Provider
         value={{
            isOpen,
            type,
            openModal,
            closeModal,
            data,
         }}
      >
         {children}
      </ProjectsContext.Provider>
   )
}
