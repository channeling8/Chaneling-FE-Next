import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import Dropdown from '@/assets/icons/dropdown.svg'
import { changeIdeaBookmark, createIdeas } from '@/api/ideas'
import type { IdeaDetail, IdeaVideoType } from '@/api/ideas'
import { Modal } from '@/components/Modal'
import { useIdeasStore } from '@/stores/ideasStore'
import { DropdownVideoType } from './DropdownVideotype'
import TextField from '@/components/TextField'
import GenerationButton from './GenerationButton'
import { SkeletonBase } from '@/components/Skeletonbase'
import SavedIdeaCard from './SavedIdeaCard'

const VIDEO_TYPE_MAP: Record<string, IdeaVideoType> = {
    선택없음: 'ALL',
    '숏폼 (3분 미만)': 'SHORTS',
    '롱폼 (3분 이상)': 'LONG',
}

interface ContentIdeaGenerationProps {
    keyword: string
    onKeywordChange: (keyword: string) => void
}

interface GenerationErrorResponse {
    code: string
    message: string
}

interface GenerationErrorModalContent {
    title: string
    caption: string
}

const GENERATION_LIMIT_ERROR: GenerationErrorModalContent = {
    title: '아이디어 생성 한도를 초과했어요',
    caption: '현재 이용 가능한 아이디어 생성 횟수를 모두 사용했어요.',
}

const DEFAULT_GENERATION_ERROR: GenerationErrorModalContent = {
    title: '아이디어를 생성하지 못했어요',
    caption: '잠시 후 다시 시도해 주세요.',
}

export default function ContentIdeaGeneration({ keyword, onKeywordChange }: ContentIdeaGenerationProps) {
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [detail, setDetail] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [generationError, setGenerationError] = useState<GenerationErrorModalContent | null>(null)
    const generatedIdeas = useIdeasStore((state) => state.generatedIdeas)
    const prependGeneratedIdeas = useIdeasStore((state) => state.prependGeneratedIdeas)
    const updateGeneratedIdeaBookmark = useIdeasStore((state) => state.updateGeneratedIdeaBookmark)
    const queryClient = useQueryClient()
    const createIdeaMutation = useMutation({
        mutationFn: createIdeas,
        onMutate: () => {
            setResultMessage('')
            setGenerationError(null)
        },
        onSuccess: (ideas) => {
            prependGeneratedIdeas(ideas)
            setResultMessage('아이디어를 생성했습니다.')
            setDetail('')
            void queryClient.invalidateQueries({ queryKey: ['ideas', 'bookmarks'] })
        },
        onError: (error) => {
            const isLimitExceeded =
                axios.isAxiosError<GenerationErrorResponse>(error) && error.response?.data.code === 'S3402'

            setGenerationError(isLimitExceeded ? GENERATION_LIMIT_ERROR : DEFAULT_GENERATION_ERROR)
        },
    })
    const bookmarkMutation = useMutation({
        mutationFn: changeIdeaBookmark,
        onSuccess: async (bookmarkResult) => {
            updateGeneratedIdeaBookmark(bookmarkResult.ideaId, bookmarkResult.isBookmarked)
            queryClient.setQueryData<IdeaDetail>(['ideas', 'detail', bookmarkResult.ideaId], (previousIdea) =>
                previousIdea
                    ? {
                          ...previousIdea,
                          isBookmarked: bookmarkResult.isBookmarked,
                      }
                    : previousIdea
            )
            await queryClient.invalidateQueries({ queryKey: ['ideas', 'bookmarks'] })
        },
    })

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
        e.stopPropagation()
        setSelectedOption(option)
        handleDropdownClick()
    }

    const dropdownRef = useRef<HTMLDivElement>(null)

    const [selectedOption, setSelectedOption] = useState('')

    const handleGenerate = () => {
        createIdeaMutation.mutate({
            keyword: keyword.trim(),
            videoType: VIDEO_TYPE_MAP[selectedOption] ?? 'ALL',
            detail: detail.trim(),
        })
    }

    useEffect(() => {
        if (!isDropdownOpen) return

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col py-1 items-start gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-primary font-title-18sb">콘텐츠 아이디어 생성</h1>
                    <div className="text-text-secondary font-body-14r">
                        입력 없이 생성하기만 눌러도 채널 맞춤형으로 제안해드려요
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div
                        className={`flex flex-col p-4 items-start gap-1 rounded-[20px] bg-bg-1 relative border self-stretch ${
                            isDropdownOpen ? ' border-text-secondary' : 'border-transparent'
                        }`}
                    >
                        <div className="font-caption-12m text-text-secondary">영상형식</div>
                        <div
                            className="flex items-start justify-between self-stretch select-none cursor-pointer relative z-10"
                            onClick={handleDropdownClick}
                            ref={dropdownRef}
                        >
                            {selectedOption == '' && (
                                <div className="font-body-14r text-text-secondary">영상 형식을 선택해 주세요.</div>
                            )}
                            {selectedOption != '' && (
                                <div className="font-body-16m text-text-primary">{selectedOption}</div>
                            )}
                            {!isDropdownOpen && <Dropdown className="cursor-pointer text-text-secondary" />}
                            {isDropdownOpen && (
                                <>
                                    <Dropdown className="cursor-pointer scale-y-[-1] text-text-secondary" />

                                    <DropdownVideoType handleOptionValue={handleOptionClick} />
                                </>
                            )}
                        </div>
                    </div>
                    <TextField
                        label="핵심 키워드"
                        value={keyword}
                        onChange={onKeywordChange}
                        className="w-full"
                        placeholder="생각나는 키워드를 입력해주세요"
                        helperText="(예: 바이브코딩, 도쿄 여행, 가을 메이크업)"
                    />
                    <TextField
                        label="추가 입력 사항"
                        maxLength={300}
                        value={detail}
                        onChange={setDetail}
                        heightVariant="large"
                        className="w-full"
                        placeholder="어떤 점을 강조하고 싶으신가요?"
                        helperText="(예: 쉬운 설명, 유머, 영상미)"
                    />
                </div>
                <GenerationButton isPending={createIdeaMutation.isPending} onClick={handleGenerate} />

                {createIdeaMutation.isPending && (
                    <div className="flex w-full flex-col gap-3">
                        {[0, 1, 2].map((index) => (
                            <SkeletonBase key={index} sizeConfig="h-50 w-full" />
                        ))}
                    </div>
                )}

                {generatedIdeas.length > 0 && (
                    <div className="flex w-full flex-col gap-3">
                        {generatedIdeas.map((idea) => (
                            <SavedIdeaCard
                                key={idea.ideaId}
                                idea={idea}
                                onClick={() => router.push(`/ideas/${idea.ideaId}`)}
                                onBookmarkClick={() => bookmarkMutation.mutate(idea.ideaId)}
                                isBookmarkPending={
                                    bookmarkMutation.isPending && bookmarkMutation.variables === idea.ideaId
                                }
                            />
                        ))}
                    </div>
                )}

                {resultMessage && (
                    <p role="status" className="px-4 font-body-14r text-text-secondary">
                        {resultMessage}
                    </p>
                )}
            </div>

            <Modal isOpen={generationError !== null} onClose={() => setGenerationError(null)}>
                <Modal.Header title={generationError?.title ?? ''} caption={generationError?.caption} />
                <Modal.Footer>
                    <Modal.Button type="button" variant="error" onClick={() => setGenerationError(null)}>
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
