import { createContext, useContext, useState, useCallback } from 'react'
import { RawProject } from '../types'

type StoreProviderProps = {
   children: React.ReactNode
}

type ProjectContextData = {
   isEditModalOpen: boolean
   openEditModal: (data: RawProject) => void
   closeEditModal: () => void
   data?: RawProject
}

const ProjectsContext = createContext<ProjectContextData | null>(null)

export const useProjectsContext = () => {
   return useContext(ProjectsContext) as ProjectContextData
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
   const [data, setData] = useState<RawProject>()
   const [isEditModalOpen, setEditModalOpen] = useState(false)

   const closeEditModal = useCallback(() => {
      setEditModalOpen(false)
   }, [])

   const openEditModal = useCallback((data: RawProject) => {
      setData(data)
      setEditModalOpen(true)
   }, [])

   return (
      <ProjectsContext.Provider
         value={{
            isEditModalOpen,
            openEditModal,
            closeEditModal,
            data,
         }}
      >
         {children}
      </ProjectsContext.Provider>
   )
}
