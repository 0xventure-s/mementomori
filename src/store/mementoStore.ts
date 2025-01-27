import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  name: string
  birthDate: string
  showResult: boolean
  remainingMonths: number
  livedMonths: number
  formError: string
}

type Actions = {
  setName: (name: string) => void
  setBirthDate: (date: string) => void
  setShowResult: (show: boolean) => void
  calculateMonths: () => void
  clearAll: () => void
}

const initialState: State = {
  name: '',
  birthDate: '',
  showResult: false,
  remainingMonths: 0,
  livedMonths: 0,
  formError: ''
}

export const useMementoStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setName: (name) => set({ name: name.trim() }),
      setBirthDate: (date) => set({ birthDate: date }),
      setShowResult: (show) => set({ showResult: show }),
      
      calculateMonths: () => {
        const { name, birthDate } = get()
        if (!name || !birthDate) return
        
        const birthDateObj = new Date(birthDate)
        const now = new Date()
        if (birthDateObj > now) return
        
        const totalMonths = 80 * 12
        const diffTime = now.getTime() - birthDateObj.getTime()
        const livedMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.437))
        const remainingMonths = Math.max(totalMonths - livedMonths, 0)
        
        set({
          livedMonths,
          remainingMonths,
          showResult: true,
          formError: ''
        })
      },
      
      clearAll: () => set(initialState)
    }),
    {
      name: 'memento-storage',
      version: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Si hay cambios de estructura entre versiones, 
          // aquí podemos transformar el estado
          return { ...initialState, ...persistedState }
        }
        return persistedState as State & Actions
      }
    }
  )
)