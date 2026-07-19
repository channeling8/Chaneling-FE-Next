import { create } from 'zustand'
import type { IdeaListItem } from '@/api/ideas'

interface IdeasState {
    generatedIdeas: IdeaListItem[]
    prependGeneratedIdeas: (ideas: IdeaListItem[]) => void
    updateGeneratedIdeaBookmark: (ideaId: number, isBookmarked: boolean) => void
    clearGeneratedIdeas: () => void
}

export const useIdeasStore = create<IdeasState>()((set) => ({
    generatedIdeas: [],
    prependGeneratedIdeas: (ideas) =>
        set((state) => {
            const generatedIdeaIds = new Set(ideas.map((idea) => idea.ideaId))

            return {
                generatedIdeas: [
                    ...ideas,
                    ...state.generatedIdeas.filter((idea) => !generatedIdeaIds.has(idea.ideaId)),
                ],
            }
        }),
    updateGeneratedIdeaBookmark: (ideaId, isBookmarked) =>
        set((state) => ({
            generatedIdeas: state.generatedIdeas.map((idea) =>
                idea.ideaId === ideaId
                    ? {
                          ...idea,
                          isBookmarked,
                      }
                    : idea
            ),
        })),
    clearGeneratedIdeas: () => set({ generatedIdeas: [] }),
}))
