export type VideoListRequest = {
    channelId: number
    type: 'ALL' | 'LONG' | 'SHORTS'
    sort: 'LATEST' | 'POPULAR' | 'DATE'
    page: number
    size: number
}

export type VideoListResponse = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    videoList: Video[]
}

type Video = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: 'ALL' | 'LONG' | 'SHORTS'
    viewCount: number
    uploadDate: string
}
