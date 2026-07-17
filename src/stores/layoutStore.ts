import { create } from 'zustand'

interface LayoutState {
    isMobileSidebarOpen: boolean
    openSidebar: () => void
    closeSidebar: () => void
    toggleSidebar: () => void
}

export const useLayoutStore = create<LayoutState>()((set) => ({
    isMobileSidebarOpen: false,
    openSidebar: () => set({ isMobileSidebarOpen: true }),
    closeSidebar: () => set({ isMobileSidebarOpen: false }),
    toggleSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
}))
