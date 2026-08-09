import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface VideoState {
    selectedVideoId: number | null
    setSelectedVideoId: (videoId: number) => void
    clearSelectedVideoId: () => void
}

export const useVideoStore = create<VideoState>()(
    persist(
        (set) => ({
            selectedVideoId: null,

            setSelectedVideoId: (videoId) => {
                set({ selectedVideoId: videoId })
            },

            clearSelectedVideoId: () => {
                set({ selectedVideoId: null })
            },
        }),
        {
            name: 'video-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
