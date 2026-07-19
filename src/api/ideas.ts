import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type IdeaSort = 'latest' | 'oldest'
export type IdeaVideoType = 'ALL' | 'LONG' | 'SHORTS'
export type TrendKeywordType = 'REAL_TIME' | 'CHANNEL'
export type TrendScoreStatus = 'UP' | 'DOWN' | 'SAME' | 'NONE'

export interface IdeaListItem {
    ideaId: number
    title: string
    contentPreview: string
    tags: string[]
    isBookmarked: boolean
    createdAt: string
}

export interface IdeaList {
    total: number
    page: number
    size: number
    hasNextPage: boolean
    ideas: IdeaListItem[]
}

export interface IdeaListParams {
    page?: number
    size?: number
    sort?: IdeaSort
    keyword?: string
}

export interface IdeaDetail {
    ideaId: number
    title: string
    content: string
    tags: string[]
    isBookmarked: boolean
    createdAt: string
}

export interface IdeaBookmarkResult {
    ideaId: number
    isBookmarked: boolean
}

export interface CreateIdeaRequest {
    keyword: string
    videoType: IdeaVideoType
    detail: string
}

interface CreatedIdeaResponse {
    id: number
    title: string
    content: string
    channel_id: number
    hash_tag: string
    is_book_marked: string
    created_at: string
    updated_at: string
}

interface BookmarkedIdeaResponse {
    ideaId: number
    title: string
    content: string
    hashTag: string
    isBookmarked: boolean
    createdAt: string
}

interface BookmarkedIdeaListResponse {
    total: number
    page: number
    size: number
    hasNextPage: boolean
    bookmarkedIdeaList: BookmarkedIdeaResponse[]
}

export interface TrendKeyword {
    trendKeywordId: number
    keywordType: TrendKeywordType
    keyword: string
    score: number
    startedAt: string | null
    createdAt: string
    scoreStatus: TrendScoreStatus
}

export interface TrendKeywordList {
    realTimeTrendKeywordList: TrendKeyword[]
    channelTrendKeywordInfoList: TrendKeyword[]
}

export async function getIdeas({
    page = 1,
    size = 10,
    sort = 'latest',
    keyword,
}: IdeaListParams = {}): Promise<IdeaList> {
    const { data } = await api.get<ApiResponse<IdeaList>>('/ideas', {
        params: {
            page,
            size,
            sort,
            keyword: keyword || undefined,
        },
    })
    return data.result
}

export async function getBookmarkedIdeas({
    page = 1,
    size = 6,
}: Pick<IdeaListParams, 'page' | 'size'> = {}): Promise<IdeaList> {
    const { data } = await api.get<ApiResponse<BookmarkedIdeaListResponse>>('/ideas/bookmarks', {
        params: {
            page,
            size,
        },
    })

    return {
        total: data.result.total,
        page: data.result.page,
        size: data.result.size,
        hasNextPage: data.result.hasNextPage,
        ideas: data.result.bookmarkedIdeaList
            .filter((idea) => idea.isBookmarked)
            .map((idea) => ({
                ideaId: idea.ideaId,
                title: idea.title,
                contentPreview: idea.content,
                tags: parseIdeaTags(undefined, idea.hashTag),
                isBookmarked: idea.isBookmarked,
                createdAt: idea.createdAt,
            })),
    }
}

export async function getIdeaDetail(ideaId: number): Promise<IdeaDetail> {
    const { data } = await api.get<ApiResponse<IdeaDetail>>(`/ideas/${ideaId}`)
    return data.result
}

export async function changeIdeaBookmark(ideaId: number): Promise<IdeaBookmarkResult> {
    const { data } = await api.patch<ApiResponse<IdeaBookmarkResult>>(`/ideas/${ideaId}/bookmarks`)
    return data.result
}

function parseIdeaTags(tags: string[] | undefined, hashTag: string | string[] | undefined) {
    let rawTags: unknown[] = tags ?? []

    if (!tags && Array.isArray(hashTag)) {
        rawTags = hashTag
    }

    if (!tags && typeof hashTag === 'string') {
        try {
            const parsedHashTag: unknown = JSON.parse(hashTag)
            rawTags = Array.isArray(parsedHashTag) ? parsedHashTag : hashTag.split(/[\s,]+/)
        } catch {
            rawTags = hashTag.split(/[\s,]+/)
        }
    }

    return rawTags
        .map((tag) =>
            String(tag)
                .trim()
                .replace(/^[\s#\[\]"']+|[\s\[\]"']+$/g, '')
        )
        .filter(Boolean)
}

function parseCreatedIdeaBookmark(value: CreatedIdeaResponse['is_book_marked'] | undefined | null) {
    return ['true', '1', 'y', 'yes'].includes(value?.toLowerCase() ?? '')
}

export async function createIdeas(request: CreateIdeaRequest): Promise<IdeaListItem[]> {
    const { data } = await api.post<ApiResponse<CreatedIdeaResponse[]>>('/ideas', request)

    return data.result.map((idea) => ({
        ideaId: idea.id,
        title: idea.title,
        contentPreview: idea.content,
        tags: parseIdeaTags(undefined, idea.hash_tag),
        isBookmarked: parseCreatedIdeaBookmark(idea.is_book_marked),
        createdAt: idea.created_at,
    }))
}

export async function getTrendKeywords(): Promise<TrendKeywordList> {
    const { data } = await api.get<ApiResponse<TrendKeywordList>>('/trendKeywords/channel')
    return data.result
}
